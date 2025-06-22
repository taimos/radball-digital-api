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
    result.addError('city', 'City is required');
  } else if (address.city!.length > 200) {
    result.addError('city', 'City cannot exceed 200 characters');
  }

  if (address?.country?.trim().length === 0) {
    result.addError('country', 'Country is required');
  } else if (address.country!.length > 20) {
    result.addError('country', 'Country cannot exceed 20 characters');
  }

  if (address?.street?.trim().length === 0) {
    result.addError('street', 'Street is required');
  } else if (address.street!.length > 200) {
    result.addError('street', 'Street cannot exceed 200 characters');
  }

  if (address?.zip?.trim().length === 0) {
    result.addError('zip', 'Zip code is required');
  } else if (address.zip!.length > 20) {
    result.addError('zip', 'Zip code cannot exceed 20 characters');
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
      result.addError('minAge', 'Minimum age cannot be negative');
    }
    if (league.maxAge < 0) {
      result.addError('maxAge', 'Maximum age cannot be negative');
    }
    if (league.maxAge < league.minAge) {
      result.addError('maxAge', 'Maximum age must be greater than or equal to minimum age');
    }
    if (league.maxAge > 100) { // adjust as needed
      result.addError('maxAge', 'Maximum age exceeds reasonable limit');
    }
  }

  // Name validations
  if (!league.name || league.name.trim().length === 0) {
    result.addError('name', 'League name is required');
  } else if (league.name.length > 100) { // adjust max length as needed
    result.addError('name', 'League name cannot exceed 100 characters');
  }

  // Description validation (if required)
  if (league.description && league.description.length > 500) {
    result.addError('description', 'Description cannot exceed 500 characters');
  }

  // Short name validation
  if (league.shortName) {
    if (league.shortName.length > 10) {
      result.addError('shortName', 'Short name cannot exceed 10 characters');
    }
    if (!/^[A-Za-z0-9]+$/.test(league.shortName)) {
      result.addError('shortName', 'Short name can only contain alphanumeric characters');
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
    result.addError('name', 'Club name is required');
  } else if (club.name.length > 100) {
    result.addError('name', 'Club name cannot exceed 100 characters');
  }

  // Short name validations
  if (club.shortName) {
    if (club.shortName.length > 30) {
      result.addError('shortName', 'Short name cannot exceed 30 characters');
    }
  }

  // Website validation
  if (club.website) {
    try {
      new URL(club.website);
      if (!club.website.startsWith('http://') && !club.website.startsWith('https://')) {
        result.addError('website', 'Website must start with http:// or https://');
      }
    } catch {
      result.addError('website', 'Invalid website URL');
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
    result.addError('name', 'Gym name is required');
  } else if (gym.name.length > 100) {
    result.addError('name', 'Gym name cannot exceed 100 characters');
  }

  // available fields validation
  if (!gym.availableFields || gym.availableFields.trim().length === 0) {
    result.addError('availableFields', 'Available fields are required');
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
    result.addError('name', 'Season name is required');
  } else if (season.name.length > 100) {
    result.addError('name', 'Season name cannot exceed 100 characters');
  }

  // Check for valid dates
  const startDate = new Date(season.startDate);
  const endDate = new Date(season.endDate);
  const registrationEnd = new Date(season.registrationEnd);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(registrationEnd.getTime())) {
    result.addError('dates', 'Invalid date format');
  }

  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (isNaN(registrationStart.getTime())) {
      result.addError('registrationStart', 'Invalid date format');
    }
  }

  // Season date validations
  if (endDate <= startDate) {
    result.addError('endDate', 'Season end date must be after start date');
  }

  // Registration period validations
  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (registrationStart) {
      if (registrationEnd <= registrationStart) {
        result.addError('registrationEnd', 'Registration end date must be after registration start date');
      }
      if (registrationStart >= startDate) {
        result.addError('registrationStart', 'Registration must start before season start date');
      }
    }
  }

  if (registrationEnd > startDate) {
    result.addError('registrationEnd', 'Registration must end before season start date');
  }

  // Future date validation
  const now = new Date();
  if (startDate < now) {
    result.addError('startDate', 'Season start date cannot be in the past');
  }

  return result;
}

export function validateSeason(season: SaveSeasonInput | ModifySeasonInput): void {
  const result = checkSeason(season);
  result.validate();
}

export function checkPerson(person: SavePersonInput | ModifyPersonInput): ValidationCheckResult {
  const result = new ValidationCheckResult();

  // Name validations
  if (!person.firstName?.trim()) {
    result.addError('firstName', 'First name is required');
  }

  if (!person.lastName?.trim()) {
    result.addError('lastName', 'Last name is required');
  }

  // Email validation
  if (person.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
    result.addError('email', 'Invalid email format');
  }

  // Phone number validation
  if (person.phone) {
    // Allow digits, spaces, +, -, and ()
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(person.phone)) {
      result.addError('phone', 'Invalid phone number format');
    }
  }

  // Date of birth validation
  if (person.dateOfBirth) {
    const date = new Date(person.dateOfBirth);
    if (isNaN(date.getTime())) {
      result.addError('dateOfBirth', 'Invalid date of birth format');
    }
    // Add age restrictions if needed
    const today = new Date();
    if (date > today) {
      result.addError('dateOfBirth', 'Date of birth cannot be in the future');
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
    result.addError('name', 'Association name is required');
  } else if (association.name.length > 100) { // adjust max length as needed
    result.addError('name', 'Association name cannot exceed 100 characters');
  }

  // Contact Email validation
  if (!association.contactEmail?.trim()) {
    result.addError('contactEmail', 'Contact email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(association.contactEmail)) {
    result.addError('contactEmail', 'Invalid contact email format');
  }

  // Contact Name validation
  if (!association.contactName?.trim()) {
    result.addError('contactName', 'Contact name is required');
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
    result.addError('name', 'League group name is required');
  } else if (leagueGroup.name.length > 100) {
    result.addError('name', 'League group name cannot exceed 100 characters');
  }

  // Number validation
  if (leagueGroup.number < 1) {
    result.addError('number', 'League group number must be positive');
  }

  // Short name validations
  if (!leagueGroup.shortName || leagueGroup.shortName.trim().length === 0) {
    result.addError('shortName', 'League group short name is required');
  } else if (leagueGroup.shortName.length > 10) {
    result.addError('shortName', 'League group short name cannot exceed 10 characters');
  } else if (!/^[A-Za-z0-9]+$/.test(leagueGroup.shortName)) {
    result.addError('shortName', 'League group short name can only contain alphanumeric characters');
  }

  // Regulation validation
  if (!leagueGroup.regulation || leagueGroup.regulation.trim().length === 0) {
    result.addError('regulation', 'League group regulation is required');
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
      result.addError('name', 'Team name cannot be empty');
    } else if (team.name.length > 100) {
      result.addError('name', 'Team name cannot exceed 100 characters');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    result.addError('name', 'Team name is required');
  }

  // League ID validation
  if ('leagueId' in team && team.leagueId !== undefined) {
    if (team.leagueId.trim().length === 0) {
      result.addError('leagueId', 'League ID cannot be empty');
    } else if (team.leagueId.length > 100) {
      result.addError('leagueId', 'League ID cannot exceed 100 characters');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    result.addError('leagueId', 'League ID is required');
  }

  // Exemption request validation
  if (team.exemptionRequest) {
    if (team.exemptionRequest.trim().length > 1000) {
      result.addError('exemptionRequest', 'Exemption request cannot exceed 1000 characters');
    }
  }

  return result;
}

export function validateTeam(team: SaveTeamInput | ModifyTeamInput | RegisterTeamInput): void {
  const result = checkTeam(team);
  result.validate();
}
