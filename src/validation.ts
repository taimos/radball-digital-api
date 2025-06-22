import { Address, ModifyAssociationInput, ModifyClubInput, ModifyGymInput, ModifyLeagueInput, ModifyPersonInput, ModifySeasonInput, SaveAssociationInput, SaveClubInput, SaveGymInput, SaveLeagueGroupInput, SaveLeagueInput, SavePersonInput, SaveSeasonInput, ModifyLeagueGroupInput, SaveTeamInput, ModifyTeamInput, RegisterTeamInput } from '@generated/graphql.model.generated';

export function validateAddress(address: Address): void {
  if (address?.city?.trim().length === 0) {
    throw new Error('City is required');
  }
  if (address.city!.length > 200) {
    throw new Error('City cannot exceed 200 characters');
  }
  if (address?.country?.trim().length === 0) {
    throw new Error('Country is required');
  }
  if (address.country!.length > 20) {
    throw new Error('Country cannot exceed 20 characters');
  }
  if (address?.street?.trim().length === 0) {
    throw new Error('Street is required');
  }
  if (address.street!.length > 200) {
    throw new Error('Street cannot exceed 200 characters');
  }
  if (address?.zip?.trim().length === 0) {
    throw new Error('Zip code is required');
  }
  if (address.zip!.length > 20) {
    throw new Error('Zip code cannot exceed 20 characters');
  }
}


export function validateLeague(league: SaveLeagueInput | ModifyLeagueInput): void {

  // Age range validations
  if (league.minAge != undefined && league.maxAge != undefined) {
    if (league.minAge < 0) {
      throw new Error('Minimum age cannot be negative');
    }
    if (league.maxAge < 0) {
      throw new Error('Maximum age cannot be negative');
    }
    if (league.maxAge < league.minAge) {
      throw new Error('Maximum age must be greater than or equal to minimum age');
    }
    if (league.maxAge > 100) { // adjust as needed
      throw new Error('Maximum age exceeds reasonable limit');
    }
  }

  // Name validations
  if (!league.name || league.name.trim().length === 0) {
    throw new Error('League name is required');
  }
  if (league.name.length > 100) { // adjust max length as needed
    throw new Error('League name cannot exceed 100 characters');
  }

  // Description validation (if required)
  if (league.description && league.description.length > 500) {
    throw new Error('Description cannot exceed 500 characters');
  }

  // Short name validation
  if (league.shortName) {
    if (league.shortName.length > 10) {
      throw new Error('Short name cannot exceed 10 characters');
    }
    if (!/^[A-Za-z0-9]+$/.test(league.shortName)) {
      throw new Error('Short name can only contain alphanumeric characters');
    }
  }
}

export function validateClub(club: SaveClubInput | ModifyClubInput): void {

  // Full name validations
  if (!club.name || club.name.trim().length === 0) {
    throw new Error('Club name is required');
  }
  if (club.name.length > 100) {
    throw new Error('Club name cannot exceed 100 characters');
  }

  // Short name validations
  if (club.shortName) {
    if (club.shortName.length > 30) {
      throw new Error('Short name cannot exceed 30 characters');
    }

  }

  // Website validation
  if (club.website) {
    try {
      new URL(club.website);
      if (!club.website.startsWith('http://') && !club.website.startsWith('https://')) {
        throw new Error('Website must start with http:// or https://');
      }
    } catch {
      throw new Error('Invalid website URL');
    }
  }

  // Address validation
  if (club.address && (club.address.city || club.address.street || club.address.zip)) {
    validateAddress(club.address);
  }
};

export function validateGym(gym: SaveGymInput | ModifyGymInput): void {
  // Name validations
  if (!gym.name || gym.name.trim().length === 0) {
    throw new Error('Gym name is required');
  }
  if (gym.name.length > 100) {
    throw new Error('Gym name cannot exceed 100 characters');
  }
  // available fields validation
  if (!gym.availableFields || gym.availableFields.trim().length === 0) {
    throw new Error('Available fields are required');
  }


  // Address validations

  validateAddress(gym.address);
}

export function validateSeason(season: SaveSeasonInput | ModifySeasonInput): void {
  // Name validations
  if (!season.name || season.name.trim().length === 0) {
    throw new Error('Season name is required');
  }
  if (season.name.length > 100) {
    throw new Error('Season name cannot exceed 100 characters');
  }
  // Check for valid dates
  const startDate = new Date(season.startDate);
  const endDate = new Date(season.endDate);
  const registrationEnd = new Date(season.registrationEnd);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ||
    isNaN(registrationEnd.getTime())) {
    throw new Error('Invalid date format');
  }
  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (isNaN(registrationStart.getTime())) {
      throw new Error('Invalid date format');
    }
  }

  // Season date validations
  if (endDate <= startDate) {
    throw new Error('Season end date must be after start date');
  }
  // Registration period validations
  if (season.registrationStart) {
    const registrationStart = new Date(season.registrationStart);
    if (registrationStart) {
      if (registrationEnd <= registrationStart) {
        throw new Error('Registration end date must be after registration start date');
      }
      if (registrationStart >= startDate) {
        throw new Error('Registration must start before season start date');
      }
    }
  }

  if (registrationEnd > startDate) {
    throw new Error('Registration must end before season start date');
  }
  // Future date validation
  const now = new Date();
  if (startDate < now) {
    throw new Error('Season start date cannot be in the past');
  }
}

export function validatePerson(person: SavePersonInput | ModifyPersonInput): void {

  const errors: string[] = [];
  // Name validations
  if (!person.firstName?.trim()) {
    errors.push('First name is required');
  }

  if (!person.lastName?.trim()) {
    errors.push('Last name is required');
  }

  // Email validation
  if (person.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
    errors.push('Invalid email format');
  }
  // Phone number validation
  if (person.phone) {
    // Allow digits, spaces, +, -, and ()
    const phoneRegex = /^[\d\s+()-]{8,20}$/;
    if (!phoneRegex.test(person.phone)) {
      throw new Error('Invalid phone number format');
    }
  }
  // Date of birth validation
  if (person.dateOfBirth) {
    const date = new Date(person.dateOfBirth);
    if (isNaN(date.getTime())) {
      errors.push('Invalid date of birth format');
    }
    // Add age restrictions if needed
    const today = new Date();
    if (date > today) {
      errors.push('Date of birth cannot be in the future');
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }

  // Address validation
  if (person.address && (person.address.city || person.address.street || person.address.zip)) {
    validateAddress(person.address);
  }
}

export function validateAssociation(association: SaveAssociationInput | ModifyAssociationInput): void {
  const errors: string[] = [];
  // Name validation
  if (!association.name?.trim()) {
    errors.push('Association name is required');
  } else if (association.name.length > 100) { // adjust max length as needed
    errors.push('Association name cannot exceed 100 characters');
  }

  // Contact Email validation
  if (!association.contactEmail?.trim()) {
    errors.push('Contact email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(association.contactEmail)) {
    errors.push('Invalid contact email format');
  }

  // Contact Name validation
  if (!association.contactName?.trim()) {
    errors.push('Contact name is required');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }

  // Address validation
  validateAddress(association.address);
}

export function validateLeagueGroup(leagueGroup: SaveLeagueGroupInput | ModifyLeagueGroupInput): void {
  // Name validations
  if (!leagueGroup.name || leagueGroup.name.trim().length === 0) {
    throw new Error('League group name is required');
  }
  if (leagueGroup.name.length > 100) {
    throw new Error('League group name cannot exceed 100 characters');
  }

  // Number validation
  if (leagueGroup.number < 1) {
    throw new Error('League group number must be positive');
  }

  // Short name validations
  if (!leagueGroup.shortName || leagueGroup.shortName.trim().length === 0) {
    throw new Error('League group short name is required');
  }
  if (leagueGroup.shortName.length > 10) {
    throw new Error('League group short name cannot exceed 10 characters');
  }
  if (!/^[A-Za-z0-9]+$/.test(leagueGroup.shortName)) {
    throw new Error('League group short name can only contain alphanumeric characters');
  }

  // Regulation validation
  if (!leagueGroup.regulation || leagueGroup.regulation.trim().length === 0) {
    throw new Error('League group regulation is required');
  }
}

export function validateTeam(team: SaveTeamInput | ModifyTeamInput | RegisterTeamInput): void {
  // Name validation
  if ('name' in team && team.name !== undefined) {
    if (team.name.trim().length === 0) {
      throw new Error('Team name cannot be empty');
    }
    if (team.name.length > 100) {
      throw new Error('Team name cannot exceed 100 characters');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    throw new Error('Team name is required');
  }

  // League ID validation
  if ('leagueId' in team && team.leagueId !== undefined) {
    if (team.leagueId.trim().length === 0) {
      throw new Error('League ID cannot be empty');
    }
    if (team.leagueId.length > 100) {
      throw new Error('League ID cannot exceed 100 characters');
    }
  } else if (!('id' in team)) { // if id is not in team, then it is a new team
    throw new Error('League ID is required');
  }

  // Exemption request validation
  if (team.exemptionRequest) {
    if (team.exemptionRequest.trim().length > 1000) {
      throw new Error('Exemption request cannot exceed 1000 characters');
    }
  }
}