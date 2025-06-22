import { SaveLeagueInput, SaveTeamInput, ModifyTeamInput, RegisterTeamInput } from '../src/generated/graphql.model.generated';
import { validateAddress, validateAssociation, validateClub, validateGym, validateLeague, validatePerson, validateSeason, validateTeam } from '../src/validation';

describe('validateAddress', () => {
  // Happy path test
  it('should accept valid address', () => {
    const validAddress = {
      street: '123 Main St',
      city: 'Springfield',
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(validAddress)).not.toThrow();
  });

  // Street tests
  it('should throw error for empty street', () => {
    const address = {
      street: '',
      city: 'Springfield',
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('Street is required');
  });

  it('should throw error for street with only whitespace', () => {
    const address = {
      street: '   ',
      city: 'Springfield',
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('Street is required');
  });

  it('should throw error for street exceeding 200 characters', () => {
    const address = {
      street: 'A'.repeat(201),
      city: 'Springfield',
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('Street cannot exceed 200 characters');
  });

  // City tests
  it('should throw error for empty city', () => {
    const address = {
      street: '123 Main St',
      city: '',
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('City is required');
  });

  it('should throw error for city exceeding 200 characters', () => {
    const address = {
      street: '123 Main St',
      city: 'A'.repeat(201),
      country: 'USA',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('City cannot exceed 200 characters');
  });

  // Country tests
  it('should throw error for empty country', () => {
    const address = {
      street: '123 Main St',
      city: 'Springfield',
      country: '',
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('Country is required');
  });

  it('should throw error for country exceeding 20 characters', () => {
    const address = {
      street: '123 Main St',
      city: 'Springfield',
      country: 'A'.repeat(21),
      zip: '12345',
    };
    expect(() => validateAddress(address)).toThrow('Country cannot exceed 20 characters');
  });

  // Zip code tests
  it('should throw error for empty zip code', () => {
    const address = {
      street: '123 Main St',
      city: 'Springfield',
      country: 'USA',
      zip: '',
    };
    expect(() => validateAddress(address)).toThrow('Zip code is required');
  });

  it('should throw error for zip code exceeding 20 characters', () => {
    const address = {
      street: '123 Main St',
      city: 'Springfield',
      country: 'USA',
      zip: 'A'.repeat(21),
    };
    expect(() => validateAddress(address)).toThrow('Zip code cannot exceed 20 characters');
  });

  // Edge cases
  it('should handle addresses with trimmed values', () => {
    const address = {
      street: '  123 Main St  ',
      city: '  Springfield  ',
      country: '  USA  ',
      zip: '  12345  ',
    };
    expect(() => validateAddress(address)).not.toThrow();
  });
});

describe('validateLeague', () => {

  const leagueTemplate: SaveLeagueInput = {
    name: 'Premier League',
    minAge: 16,
    maxAge: 40,
    seasonId: '2023/24',
    additionalEligibleAssociations: [],
    description: 'Description',
    shortName: 'pl',
  };
  // Happy path tests
  it('should accept valid league with minimal data', () => {
    const league: SaveLeagueInput = {
      name: 'Premier League',
      additionalEligibleAssociations: [],
      description: 'Description',
      seasonId: 'seasonId',
    };
    expect(() => validateLeague(league)).not.toThrow();
  });

  it('should accept valid league with all data', () => {
    const league = {
      ...leagueTemplate,
    };
    expect(() => validateLeague(league)).not.toThrow();
  });

  // Name validation tests
  describe('name validation', () => {
    it('should throw error for missing name', () => {
      const league = {
        ...leagueTemplate,
        name: '',
      };
      expect(() => validateLeague(league)).toThrow('League name is required');
    });

    it('should throw error for whitespace-only name', () => {
      const league = {
        ...leagueTemplate,
        name: '   ',
      };
      expect(() => validateLeague(league)).toThrow('League name is required');
    });

    it('should throw error for name exceeding 100 characters', () => {
      const league = {
        ...leagueTemplate,
        name: 'A'.repeat(101),
      };
      expect(() => validateLeague(league)).toThrow('League name cannot exceed 100 characters');
    });
  });

  // Age validation tests
  describe('age validation', () => {
    it('should throw error for negative minimum age', () => {
      const league = {
        ...leagueTemplate,
        name: 'Test League',
        minAge: -1,
        maxAge: 40,
      };
      expect(() => validateLeague(league)).toThrow('Minimum age cannot be negative');
    });

    it('should throw error for negative maximum age', () => {
      const league = {
        ...leagueTemplate,
        name: 'Test League',
        minAge: 16,
        maxAge: -1,
      };
      expect(() => validateLeague(league)).toThrow('Maximum age cannot be negative');
    });

    it('should throw error when max age is less than min age', () => {
      const league = {
        ...leagueTemplate,
        name: 'Test League',
        minAge: 20,
        maxAge: 18,
      };
      expect(() => validateLeague(league)).toThrow('Maximum age must be greater than or equal to minimum age');
    });

    it('should throw error for unreasonable maximum age', () => {
      const league = {
        ...leagueTemplate,
        name: 'Test League',
        maxAge: 101,
      };
      expect(() => validateLeague(league)).toThrow('Maximum age exceeds reasonable limit');
    });

  });
  describe('description validation', () => {
    it('should throw error for description exceeding 500 characters', () => {
      const league = {
        ...leagueTemplate,
        description: 'A'.repeat(501),
      };
      expect(() => validateLeague(league)).toThrow('Description cannot exceed 500 characters');
    });
  });
  describe('short name validation', () => {
    it('should throw error for short name exceeding 10 characters', () => {
      const league = {
        ...leagueTemplate,
        shortName: 'A'.repeat(11),
      };
      expect(() => validateLeague(league)).toThrow('Short name cannot exceed 10 characters');
    });
  });
});

describe('validate Club', () => {
  const validAddress = {
    street: '123 Main St',
    city: 'Springfield',
    country: 'USA',
    zip: '12345',
  };

  const clubTemplateShort = {
    address: validAddress,
    associationId: 'associationId',
    contactId: 'contactId',
    name: 'Club Name',
  };

  const clubTemplateLong = {
    address: validAddress,
    associationId: 'associationId',
    contactId: 'contactId',
    name: 'Club Name',
    shortName: 'ShortNameClub',
    website: 'https://taimos.de',
  };
  it('should accept club with all data', () => {
    expect(() => validateClub(clubTemplateLong)).not.toThrow();
  });
  it('should accept club with min data', () => {
    expect(() => validateClub(clubTemplateShort)).not.toThrow();
  });
  describe('name tests', () => {
    it('should throw error for missing name', () => {
      const club = {
        ...clubTemplateShort,
        name: '',
      };
      expect(() => validateClub(club)).toThrow('Club name is required');
    });
    it('should throw error for exceeding 100 characters', () => {
      const club = {
        ...clubTemplateShort,
        name: 'A'.repeat(101),
      };
      expect(() => validateClub(club)).toThrow('Club name cannot exceed 100 characters');
    });
  });
  describe('short name tests', () => {
    it('should throw error for short name exceeding 30 characters', () => {
      const club = {
        ...clubTemplateLong,
        shortName: 'A'.repeat(31),
      };
      expect(() => validateClub(club)).toThrow('Short name cannot exceed 30 characters');
    });
  });
  describe('website validation', () => {
    it('should throw error for invalid website URL', () => {
      const club = {
        ...clubTemplateLong,
        website: 'joasdohi',
      };
      expect(() => validateClub(club)).toThrow('Invalid website URL');
    });
  });
});

describe('validate Gym', () => {
  const validAddress = {
    street: '123 Main St',
    city: 'Springfield',
    country: 'USA',
    zip: '12345',
  };

  it('should throw error for missing name', () => {
    const gym = {
      address: validAddress,
      name: '',
      club: 'ClubName',
      availableFields: 'viele',
      id: 'ID',
    };
    expect(() => validateGym(gym)).toThrow('Gym name is required');
  });
  it('should throw error for gym name exceeding 100 characters', () => {
    const gym = {
      address: validAddress,
      name: 'A'.repeat(101),
      club: 'ClubName',
      availableFields: 'viele',
      id: 'ID',
    };
    expect(() => validateGym(gym)).toThrow('Gym name cannot exceed 100 characters');
  });
  it('should throw error for required available fields', () => {
    const gym = {
      address: validAddress,
      name: 'GymName',
      club: 'ClubName',
      availableFields: '',
      id: 'ID',
    };
    expect(() => validateGym(gym)).toThrow('Available fields are required');
  });
});

describe('validate Season', () => {
  const seasonTemplate = {
    name: 'SeasonName',
    startDate: '2023-07-30',
    endDate: '2024-01-20',
    associationId: 'ID',
    registrationStart: '2023-06-01',
    registrationEnd: '2023-06-30',
  };
  describe('name validation', () => {
    it('should throw error for required season name', () => {
      const season = {
        ...seasonTemplate,
        name: '',
      };
      expect(() => validateSeason(season)).toThrow('Season name is required');
    });
    it('should throw error for season name exceeding 100 characters', () => {
      const season = {
        ...seasonTemplate,
        name: 'A'.repeat(101),
      };
      expect(() => validateSeason(season)).toThrow('Season name cannot exceed 100 characters');
    });
  });
  describe('check for valid dates', () => {
    it('should throw error for invalid date format for startDate', () => {
      const season = {
        ...seasonTemplate,
        startDate: 'fdas',
      };
      expect(() => validateSeason(season)).toThrow('Invalid date format');
    });
    it('should throw error for invalid date format for endDate', () => {
      const season = {
        ...seasonTemplate,
        endDate: 'fdas',
      };
      expect(() => validateSeason(season)).toThrow('Invalid date format');
    });
    it('should throw error for invalid date format for registrationStart', () => {
      const season = {
        ...seasonTemplate,
        registrationStart: 'fdas',
      };
      expect(() => validateSeason(season)).toThrow('Invalid date format');
    });
    it('should throw error for invalid date format for registrationEnd', () => {
      const season = {
        ...seasonTemplate,
        registrationEnd: 'fdas',
      };
      expect(() => validateSeason(season)).toThrow('Invalid date format');
    });
    it('should throw error for season endDate before startDate', () => {
      const season = {
        ...seasonTemplate,
        startDate: '2030-06-20',
        endDate: '2030-06-10',
      };
      expect(() => validateSeason(season)).toThrow('Season end date must be after start date');
    });
    it('should throw error for registration start date before registration end date', () => {
      const season = {
        ...seasonTemplate,
        registrationStart: '2030-07-10',
        registrationEnd: '2030-06-25',
      };
      expect(() => validateSeason(season)).toThrow('Registration end date must be after registration start date');
    });
    it('should throw error for registration start date after season start date', () => {
      const season = {
        ...seasonTemplate,
        registrationStart: '2030-08-30',
        registrationEnd: '2030-09-01',
        startDate: '2030-05-08',
        endDate: '2030-06-07',
      };
      expect(() => validateSeason(season)).toThrow('Registration must start before season start date');
    });
    it('should throw error for registration end after season start date', () => {
      const season = {
        ...seasonTemplate,
        registrationEnd: '2030-08-14',
        startDate: '2030-07-15',
        endDate: '2030-10-20',
      };
      expect(() => validateSeason(season)).toThrow('Registration must end before season start date');
    });
    it('should throw error for season start date being in the past', () => {
      const season = {
        ...seasonTemplate,
        startDate: '2023-08-05',
      };
      expect(() => validateSeason(season)).toThrow('Season start date cannot be in the past');
    });

  });
});
describe('validate person', () => {
  const validAddress = {
    street: '123 Main St',
    city: 'Springfield',
    country: 'USA',
    zip: '12345',
  };
  const personTemplate = {
    subjectId: 'ID',
    firstName: 'Max',
    lastName: 'Mustermann',
    gender: 'männlich',
    dateOfBirth: '2001-08-15',
    clubId: 'ID',
    uciCode: 'Code',
    nationality: 'deutsch',
    email: 'max.mustermann@email.com',
    phone: '017164728237',
    address: validAddress,
  };
  describe('email validation', () => {
    it('should throw an error for invalid email format', () => {
      const person = {
        ...personTemplate,
        email: 'bio u9p ',
      };
      expect(() => validatePerson(person)).toThrow('Invalid email format');
    });
  });
  describe('phone number validation', () => {
    it('should throw error for invalid phone number format', () => {
      const person = {
        ...personTemplate,
        phone: 'jopn68-d90',
      };
      expect(() => validatePerson(person)).toThrow('Invalid phone number format');
    });
  });
  describe('date of birth validation', () => {
    it('should throw an error for invalid date of birth format', () => {
      const person = {
        ...personTemplate,
        dateOfBirth: 'fsf',
      };
      expect(() => validatePerson(person)).toThrow('Invalid date of birth format');
    });
    it('should throw an error for date of birth being in the future', () => {
      const person = {
        ...personTemplate,
        dateOfBirth: '2030-07-23',
      };
      expect(() => validatePerson(person)).toThrow('Date of birth cannot be in the future');
    });
  });
});

describe('validate Association', () => {
  const validAddress = {
    street: '123 Main St',
    city: 'Springfield',
    country: 'USA',
    zip: '12345',
  };

  const associationTemplate = {
    name: 'Association1',
    shortName: 'AS1',
    address: validAddress,
    contactName: 'Max Mustermann',
    contactEmail: 'max.mustermann@email.de',
    website: 'https://taimos.de',
    phone: '01834789234892',
    coordinators: ['Id', 'fd'],
  };
  describe('name validation', () => {
    it('should throw an error for required association name', () => {
      const association = {
        ...associationTemplate,
        name: '',
      };
      expect(() => validateAssociation(association)).toThrow('Association name is required');
    });
    it('should throw an error for association name exceeding 100 characters', () => {
      const association = {
        ...associationTemplate,
        name: 'a'.repeat(101),
      };
      expect(() => validateAssociation(association)).toThrow('Association name cannot exceed 100 characters');
    });
  });
  describe('email validation', () => {
    it('should throw an error for required email contact', () => {
      const association = {
        ...associationTemplate,
        contactEmail: '',
      };
      expect(() => validateAssociation(association)).toThrow('Contact email is required');
    });
    it('should throw en error for invalid contact email format', () => {
      const association = {
        ...associationTemplate,
        contactEmail: 'vdas gfd',
      };
      expect(() => validateAssociation(association)).toThrow('Invalid contact email format');
    });
  });
  describe('contact name validation', () => {
    it('should throw an error for required contact name', () => {
      const association = {
        ...associationTemplate,
        contactName: '',
      };
      expect(() => validateAssociation(association)).toThrow('Contact name is required');
    });
  });
});

describe('validateTeam', () => {
  // Test templates
  const saveTeamTemplate: SaveTeamInput = {
    name: 'Team Name',
    clubId: 'club-123',
    leagueId: 'league-123',
    playerIds: ['player1', 'player2'],
  };

  const modifyTeamTemplate: ModifyTeamInput = {
    id: 'team-123',
    name: 'Modified Team Name',
    leagueId: 'league-123',
  };

  const registerTeamTemplate: RegisterTeamInput = {
    name: 'Register Team Name',
    leagueId: 'league-123',
    playerIds: ['player1', 'player2'],
  };

  describe('SaveTeamInput validation', () => {
    it('should accept valid SaveTeamInput', () => {
      expect(() => validateTeam(saveTeamTemplate)).not.toThrow();
    });

    it('should accept SaveTeamInput with all optional fields', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        leagueGroupId: 'group-123',
        sgClubId: 'sg-club-123',
        secondRightToPlay: true,
        withoutCompetition: false,
        exemptionRequest: 'Need exemption for special case',
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for missing name in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        name: '',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for whitespace-only name in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        name: '   ',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for name exceeding 100 characters in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        name: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot exceed 100 characters');
    });

    it('should throw error for missing leagueId in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        leagueId: '',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for whitespace-only leagueId in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        leagueId: '   ',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for leagueId exceeding 100 characters in SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        leagueId: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot exceed 100 characters');
    });
  });

  describe('ModifyTeamInput validation', () => {
    it('should accept valid ModifyTeamInput with minimal data', () => {
      const team: ModifyTeamInput = {
        id: 'team-123',
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should accept valid ModifyTeamInput with all fields', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        leagueGroupId: 'group-123',
        sgClubId: 'sg-club-123',
        secondRightToPlay: true,
        withoutCompetition: false,
        exemptionRequest: 'Need exemption for special case',
        playerIds: ['player1', 'player2'],
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for empty name in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        name: '',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for whitespace-only name in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        name: '   ',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for name exceeding 100 characters in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        name: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot exceed 100 characters');
    });

    it('should throw error for empty leagueId in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        leagueId: '',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for whitespace-only leagueId in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        leagueId: '   ',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for leagueId exceeding 100 characters in ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        leagueId: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot exceed 100 characters');
    });
  });

  describe('RegisterTeamInput validation', () => {
    it('should accept valid RegisterTeamInput', () => {
      expect(() => validateTeam(registerTeamTemplate)).not.toThrow();
    });

    it('should accept RegisterTeamInput with all optional fields', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        sgClubId: 'sg-club-123',
        secondRightToPlay: true,
        withoutCompetition: false,
        exemptionRequest: 'Need exemption for special case',
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for missing name in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        name: '',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for whitespace-only name in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        name: '   ',
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot be empty');
    });

    it('should throw error for name exceeding 100 characters in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        name: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('Team name cannot exceed 100 characters');
    });

    it('should throw error for missing leagueId in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        leagueId: '',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for whitespace-only leagueId in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        leagueId: '   ',
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot be empty');
    });

    it('should throw error for leagueId exceeding 100 characters in RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        leagueId: 'A'.repeat(101),
      };
      expect(() => validateTeam(team)).toThrow('League ID cannot exceed 100 characters');
    });
  });

  describe('exemptionRequest validation', () => {
    it('should accept exemptionRequest within 1000 characters for SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        exemptionRequest: 'A'.repeat(1000),
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for exemptionRequest exceeding 1000 characters for SaveTeamInput', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        exemptionRequest: 'A'.repeat(1001),
      };
      expect(() => validateTeam(team)).toThrow('Exemption request cannot exceed 1000 characters');
    });

    it('should accept exemptionRequest within 1000 characters for ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        exemptionRequest: 'A'.repeat(1000),
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for exemptionRequest exceeding 1000 characters for ModifyTeamInput', () => {
      const team: ModifyTeamInput = {
        ...modifyTeamTemplate,
        exemptionRequest: 'A'.repeat(1001),
      };
      expect(() => validateTeam(team)).toThrow('Exemption request cannot exceed 1000 characters');
    });

    it('should accept exemptionRequest within 1000 characters for RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        exemptionRequest: 'A'.repeat(1000),
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for exemptionRequest exceeding 1000 characters for RegisterTeamInput', () => {
      const team: RegisterTeamInput = {
        ...registerTeamTemplate,
        exemptionRequest: 'A'.repeat(1001),
      };
      expect(() => validateTeam(team)).toThrow('Exemption request cannot exceed 1000 characters');
    });

    it('should handle whitespace-only exemptionRequest without error', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        exemptionRequest: '   ',
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should handle empty exemptionRequest without error', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        exemptionRequest: '',
      };
      expect(() => validateTeam(team)).not.toThrow();
    });

    it('should throw error for exemptionRequest with trimmed length exceeding 1000 characters', () => {
      const team: SaveTeamInput = {
        ...saveTeamTemplate,
        exemptionRequest: '  ' + 'A'.repeat(1001) + '  ',
      };
      expect(() => validateTeam(team)).toThrow('Exemption request cannot exceed 1000 characters');
    });
  });
});