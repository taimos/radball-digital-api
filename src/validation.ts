import { Address, ModifyAssociationInput, ModifyClubInput, ModifyGymInput, ModifyLeagueInput, ModifyPersonInput, ModifySeasonInput, SaveAssociationInput, SaveClubInput, SaveGymInput, SaveLeagueGroupInput, SaveLeagueInput, SavePersonInput, SaveSeasonInput, ModifyLeagueGroupInput, SaveTeamInput, ModifyTeamInput, RegisterTeamInput } from '@generated/graphql.model.generated';

export class ValidationCheckResult {

  public readonly warnings: { [field: string]: string[] } = {};
  public readonly errors: { [field: string]: string[] } = {};

  public addWarning(field: string, message: string): void {
    if (!this.warnings[field]) {
      this.warnings[field] = [];
    }
    this.warnings[field].push(message);
  }

  public addError(field: string, message: string): void {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(message);
  }

  public getErrorMessages(): string[] {
    return Object.values(this.errors).flat();
  }

  public getWarningMessages(): string[] {
    return Object.values(this.warnings).flat();
  }

  public getErrorMessagesString(): string {
    return this.getErrorMessages().join('; ');
  }

  public getWarningMessagesString(): string {
    return this.getWarningMessages().join('; ');
  }

  public validate(): void {
    if (Object.keys(this.errors).length > 0) {
      throw new Error(this.getErrorMessagesString());
    }
  }
}

export function checkAddress(address: Address): ValidationCheckResult {
  const result = new ValidationCheckResult();

  if (address?.city?.trim().length === 0) {
    result.addError('city', 'Stadt ist erforderlich');
  } else if (address.city!.length > 200) {
    result.addError('city', 'Stadt darf 200 Zeichen nicht überschreiten');
  }

  if (address?.country?.trim().length === 0) {
    result.addError('country', 'Land ist erforderlich');
  } else if (address.country!.length > 20) {
    result.addError('country', 'Land darf 20 Zeichen nicht überschreiten');
  }

  if (address?.street?.trim().length === 0) {
    result.addError('street', 'Straße ist erforderlich');
  } else if (address.street!.length > 200) {
    result.addError('street', 'Straße darf 200 Zeichen nicht überschreiten');
  }

  if (address?.zip?.trim().length === 0) {
    result.addError('zip', 'PLZ ist erforderlich');
  } else if (address.zip!.length > 20) {
    result.addError('zip', 'PLZ darf 20 Zeichen nicht überschreiten');
  }

  return result;
}

export function validateAddress(address: Address): void {
  const result = checkAddress(address);
  result.validate();
}

export function checkLeague(league: SaveLeagueInput | ModifyLeagueInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Age range validations
  if (league.minAge != undefined && league.maxAge != undefined) {
    if (league.minAge < 0) {
      result.addError('minAge', 'Mindestalter darf nicht negativ sein');
    }
    if (league.maxAge < 0) {
      result.addError('maxAge', 'Maximalalter darf nicht negativ sein');
    }
    if (league.maxAge < league.minAge) {
      result.addError('maxAge', 'Maximalalter muss größer oder gleich dem Mindestalter sein');
    }
    if (league.maxAge > 100) { // adjust as needed
      result.addError('maxAge', 'Maximalalter überschreitet das vernünftige Limit');
    }
  }

  // Name validations
  if (!league.name || league.name.trim().length === 0) {
    result.addError('name', 'Liganame ist erforderlich');
  } else if (league.name.length > 100) { // adjust max length as needed
    result.addError('name', 'Liganame darf 100 Zeichen nicht überschreiten');
  }

  // Description validation (if required)
  if (league.description && league.description.length > 500) {
    result.addError('description', 'Beschreibung darf 500 Zeichen nicht überschreiten');
  }

  // Short name validation
  if (league.shortName) {
    if (league.shortName.length > 10) {
      result.addError('shortName', 'Kurzname darf 10 Zeichen nicht überschreiten');
    }
    if (!/^[A-Za-z0-9]+$/.test(league.shortName)) {
      result.addError('shortName', 'Kurzname darf nur alphanumerische Zeichen enthalten');
    }
  }

  return result;
}

export function validateLeague(league: SaveLeagueInput | ModifyLeagueInput): void {
  const result = checkLeague(league);
  result.validate();
}

export function checkClub(club: SaveClubInput | ModifyClubInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Full name validations
  if (!club.name || club.name.trim().length === 0) {
    result.addError('name', 'Vereinsname ist erforderlich');
  } else if (club.name.length > 100) {
    result.addError('name', 'Vereinsname darf 100 Zeichen nicht überschreiten');
  }

  // Short name validations
  if (club.shortName) {
    if (club.shortName.length > 30) {
      result.addError('shortName', 'Kurzname darf 30 Zeichen nicht überschreiten');
    }
  }

  // Website validation
  if (club.website) {
    try {
      new URL(club.website);
      if (!club.website.startsWith('http://') && !club.website.startsWith('https://')) {
        result.addError('website', 'Website muss mit http:// oder https:// beginnen');
      }
    } catch {
      result.addError('website', 'Ungültige Website-URL');
    }
  }

  // Address validation
  if (club.address && (club.address.city || club.address.street || club.address.zip)) {
    const addressResult = checkAddress(club.address);
    // Merge address errors into the main result
    Object.entries(addressResult.errors).forEach(([field, messages]) => {
      messages.forEach(message => result.addError(`address.${field}`, message));
    });
    Object.entries(addressResult.warnings).forEach(([field, messages]) => {
      messages.forEach(message => result.addWarning(`address.${field}`, message));
    });
  }

  return result;
}

export function validateClub(club: SaveClubInput | ModifyClubInput): void {
  const result = checkClub(club);
  result.validate();
}

export function checkGym(gym: SaveGymInput | ModifyGymInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validations
  if (!gym.name || gym.name.trim().length === 0) {
    result.addError('name', 'Hallenname ist erforderlich');
  } else if (gym.name.length > 100) {
    result.addError('name', 'Hallenname darf 100 Zeichen nicht überschreiten');
  }

  // available fields validation
  if (!gym.availableFields || gym.availableFields.trim().length === 0) {
    result.addError('availableFields', 'Verfügbare Felder sind erforderlich');
  }

  // Address validations
  const addressResult = checkAddress(gym.address);
  // Merge address errors into the main result
  Object.entries(addressResult.errors).forEach(([field, messages]) => {
    messages.forEach(message => result.addError(`address.${field}`, message));
  });
  Object.entries(addressResult.warnings).forEach(([field, messages]) => {
    messages.forEach(message => result.addWarning(`address.${field}`, message));
  });

  return result;
}

export function validateGym(gym: SaveGymInput | ModifyGymInput): void {
  const result = checkGym(gym);
  result.validate();
}

export function checkSeason(season: SaveSeasonInput | ModifySeasonInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validations
  if (!season.name || season.name.trim().length === 0) {
    result.addError('name', 'Saisonname ist erforderlich');
  } else if (season.name.length > 100) {
    result.addError('name', 'Saisonname darf 100 Zeichen nicht überschreiten');
  }

  // Check for valid dates
  const startDate = new Date(season.startDate);
  const endDate = new Date(season.endDate);
  const registrationEnd = new Date(season.registrationEnd);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(registrationEnd.getTime())) {
    result.addError('dates', 'Ungültiges Datumsformat');
  }

  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (isNaN(registrationStart.getTime())) {
      result.addError('registrationStart', 'Ungültiges Datumsformat');
    }
  }

  // Season date validations
  if (endDate <= startDate) {
    result.addError('endDate', 'Saison-Enddatum muss nach dem Startdatum liegen');
  }

  // Registration period validations
  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (registrationStart) {
      if (registrationEnd <= registrationStart) {
        result.addError('registrationEnd', 'Anmeldungsende muss nach dem Anmeldungsstart liegen');
      }
      if (registrationStart >= startDate) {
        result.addError('registrationStart', 'Anmeldung muss vor dem Saisonstart beginnen');
      }
    }
  }

  if (registrationEnd > startDate) {
    result.addError('registrationEnd', 'Anmeldung muss vor dem Saisonstart enden');
  }

  // Future date validation
  const now = new Date();
  if (startDate < now) {
    result.addError('startDate', 'Saison-Startdatum darf nicht in der Vergangenheit liegen');
  }

  // League order validation (only for ModifySeasonInput)
  if ('leagueOrder' in season && season.leagueOrder && Array.isArray(season.leagueOrder)) {
    if (season.leagueOrder.length > 0) {
      // Check for duplicate league IDs
      const uniqueIds = new Set(season.leagueOrder);
      if (uniqueIds.size !== season.leagueOrder.length) {
        result.addError('leagueOrder', 'Liga-Reihenfolge darf keine doppelten Liga-IDs enthalten');
      }

      // Check for empty league IDs
      const emptyIds = season.leagueOrder.filter((id: string) => !id || id.trim().length === 0);
      if (emptyIds.length > 0) {
        result.addError('leagueOrder', 'Liga-Reihenfolge darf keine leeren Liga-IDs enthalten');
      }
    }
  }

  return result;
}

export function validateSeason(season: SaveSeasonInput | ModifySeasonInput): void {
  const result = checkSeason(season);
  result.validate();
}

export function isSeasonOpenForRegistration(season: SaveSeasonInput | ModifySeasonInput, date: string): boolean {
  const { registrationStart, registrationEnd } = season;
  if (!registrationStart || !registrationEnd) return false;
  // Expect AWSDate (YYYY-MM-DD); guard to keep comparisons reliable
  const isAwsDate = (s: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(s);
  if (!isAwsDate(date) || !isAwsDate(registrationStart) || !isAwsDate(registrationEnd)) return false;
  // Inclusive range
  return registrationStart <= date && date <= registrationEnd;
}

export function checkPerson(person: SavePersonInput | ModifyPersonInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validations
  if (!person.firstName?.trim()) {
    result.addError('firstName', 'Vorname ist erforderlich');
  }

  if (!person.lastName?.trim()) {
    result.addError('lastName', 'Nachname ist erforderlich');
  }

  // Email validation
  if (person.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
    result.addError('email', 'Ungültiges E-Mail-Format');
  }

  // Phone number validation
  if (person.phone) {
    // Allow digits, spaces, +, -, and ()
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(person.phone)) {
      result.addError('phone', 'Ungültiges Telefonnummer-Format (+49 1234 567890)');
    }
  }

  // Date of birth validation
  if (person.dateOfBirth) {
    const date = new Date(person.dateOfBirth);
    if (isNaN(date.getTime())) {
      result.addError('dateOfBirth', 'Ungültiges Geburtsdatumsformat');
    }
    // Add age restrictions if needed
    const today = new Date();
    if (date > today) {
      result.addError('dateOfBirth', 'Geburtsdatum darf nicht in der Zukunft liegen');
    }
  }

  // Address validation
  if (person.address && (person.address.city || person.address.street || person.address.zip)) {
    const addressResult = checkAddress(person.address);
    // Merge address errors into the main result
    Object.entries(addressResult.errors).forEach(([field, messages]) => {
      messages.forEach(message => result.addError(`address.${field}`, message));
    });
    Object.entries(addressResult.warnings).forEach(([field, messages]) => {
      messages.forEach(message => result.addWarning(`address.${field}`, message));
    });
  }

  return result;
}

export function validatePerson(person: SavePersonInput | ModifyPersonInput): void {
  const result = checkPerson(person);
  result.validate();
}

export function checkAssociation(association: SaveAssociationInput | ModifyAssociationInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validation
  if (!association.name?.trim()) {
    result.addError('name', 'Verbandsname ist erforderlich');
  } else if (association.name.length > 100) { // adjust max length as needed
    result.addError('name', 'Verbandsname darf 100 Zeichen nicht überschreiten');
  }

  // Contact Email validation
  if (!association.contactEmail?.trim()) {
    result.addError('contactEmail', 'Kontakt-E-Mail ist erforderlich');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(association.contactEmail)) {
    result.addError('contactEmail', 'Ungültiges Kontakt-E-Mail-Format');
  }

  // Contact Name validation
  if (!association.contactName?.trim()) {
    result.addError('contactName', 'Kontaktname ist erforderlich');
  }

  // Address validation
  const addressResult = checkAddress(association.address);
  // Merge address errors into the main result
  Object.entries(addressResult.errors).forEach(([field, messages]) => {
    messages.forEach(message => result.addError(`address.${field}`, message));
  });
  Object.entries(addressResult.warnings).forEach(([field, messages]) => {
    messages.forEach(message => result.addWarning(`address.${field}`, message));
  });

  return result;
}

export function validateAssociation(association: SaveAssociationInput | ModifyAssociationInput): void {
  const result = checkAssociation(association);
  result.validate();
}

export function checkLeagueGroup(leagueGroup: SaveLeagueGroupInput | ModifyLeagueGroupInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validations
  if (!leagueGroup.name || leagueGroup.name.trim().length === 0) {
    result.addError('name', 'Staffelname ist erforderlich');
  } else if (leagueGroup.name.length > 100) {
    result.addError('name', 'Staffelname darf 100 Zeichen nicht überschreiten');
  }

  // Number validation
  if (leagueGroup.number < 1) {
    result.addError('number', 'Staffelnummer muss positiv sein');
  }

  // Short name validations
  if (!leagueGroup.shortName || leagueGroup.shortName.trim().length === 0) {
    result.addError('shortName', 'Staffel-Kurzname ist erforderlich');
  } else if (leagueGroup.shortName.length > 10) {
    result.addError('shortName', 'Staffel-Kurzname darf 10 Zeichen nicht überschreiten');
  } else if (!/^[A-Za-z0-9]+$/.test(leagueGroup.shortName)) {
    result.addError('shortName', 'Staffel-Kurzname darf nur alphanumerische Zeichen enthalten');
  }

  // Regulation validation
  if (!leagueGroup.regulation || leagueGroup.regulation.trim().length === 0) {
    result.addError('regulation', 'Staffel-Regelungen sind erforderlich');
  }

  return result;
}

export function validateLeagueGroup(leagueGroup: SaveLeagueGroupInput | ModifyLeagueGroupInput): void {
  const result = checkLeagueGroup(leagueGroup);
  result.validate();
}

export function checkTeam(team: SaveTeamInput | ModifyTeamInput | RegisterTeamInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validation
  if ('name' in team && team.name !== undefined) {
    if (team.name.trim().length === 0) {
      result.addError('name', 'Teamname darf nicht leer sein');
    } else if (team.name.length > 100) {
      result.addError('name', 'Teamname darf 100 Zeichen nicht überschreiten');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    result.addError('name', 'Teamname ist erforderlich');
  }

  // League ID validation
  if ('leagueId' in team && team.leagueId !== undefined) {
    if (team.leagueId.trim().length === 0) {
      result.addError('leagueId', 'Liga-ID darf nicht leer sein');
    } else if (team.leagueId.length > 100) {
      result.addError('leagueId', 'Liga-ID darf 100 Zeichen nicht überschreiten');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    result.addError('leagueId', 'Liga-ID ist erforderlich');
  }

  // Exemption request validation
  if (team.exemptionRequest) {
    if (team.exemptionRequest.trim().length > 1000) {
      result.addError('exemptionRequest', 'Freistellungsantrag darf 1000 Zeichen nicht überschreiten');
    }
  }

  // Player IDs validation
  if (!team.playerIds || team.playerIds.length < 2) {
    result.addError('playerIds', 'Es müssen mindestens 2 Spieler für ein Team angegeben werden');
  }

  return result;
}

export function validateTeam(team: SaveTeamInput | ModifyTeamInput | RegisterTeamInput): void {
  const result = checkTeam(team);
  result.validate();
}


