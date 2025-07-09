# Radball Digital API - LLM Documentation

This document provides comprehensive guidance for LLMs to effectively use the `@taimos/radball-digital-api` library when generating code for Radball (cycle ball) sports management applications.

## Installation

```bash
npm install @taimos/radball-digital-api
```

## Core Imports

```typescript
// Import GraphQL types
import {
  Association,
  Season,
  League,
  LeagueGroup,
  Club,
  Team,
  Person,
  Gym,
  Game,
  MatchDay,
  SaveAssociationInput,
  SaveClubInput,
  SaveTeamInput,
  Query,
  Mutation,
  Scalars
} from '@taimos/radball-digital-api';

// Import validation functions
import {
  validateAssociation,
  validateClub,
  validateTeam,
  validatePerson,
  checkAssociation,
  checkClub,
  ValidationCheckResult
} from '@taimos/radball-digital-api';

// Import REST API types
import { paths, operations, components } from '@taimos/radball-digital-api';
```

## Type System Overview

### Scalar Types

The library uses AWS AppSync scalar types:

```typescript
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: string;      // Format: YYYY-MM-DD
  AWSDateTime: string;  // ISO 8601 format
  AWSEmail: string;     // Email address
  AWSURL: string;       // URL string
  AWSTimestamp: number; // Unix timestamp
};
```

### Nullable Types

```typescript
// Maybe<T> - Can be T, null, or undefined
type Maybe<T> = T | null | undefined;

// InputMaybe<T> - For input types
type InputMaybe<T> = T | null | undefined;
```

## Core Entity Types

### Association

```typescript
// Type definition
interface Association {
  __typename?: 'Association';
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
}

// Create/Update input
interface SaveAssociationInput {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  shortName?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
}

// Usage example
const newAssociation: SaveAssociationInput = {
  name: 'Deutscher Radball Verband',
  shortName: 'DRV',
  type: 'NATIONAL'
};

// Validation
try {
  validateAssociation(newAssociation);
  // Association is valid, proceed with save
} catch (error) {
  console.error('Validation failed:', error);
}
```

### Club

```typescript
// Type definition
interface Club {
  __typename?: 'Club';
  associationId: Scalars['ID'];
  createdAt: Scalars['AWSDateTime'];
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  legacyId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
}

// Create/Update input
interface SaveClubInput {
  associationId: Scalars['ID'];
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  legacyId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  shortName?: InputMaybe<Scalars['String']>;
}

// Usage example
const newClub: SaveClubInput = {
  associationId: 'association-123',
  name: 'RV Musterhausen',
  shortName: 'RVM',
  externalId: 'ext-456'
};
```

### Team

```typescript
// Type definition
interface Team {
  __typename?: 'Team';
  ageClass?: Maybe<Scalars['String']>;
  clubId: Scalars['ID'];
  createdAt: Scalars['AWSDateTime'];
  discipline: Scalars['String'];
  id: Scalars['ID'];
  legacyNumber?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  secondaryClubId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
}

// Create/Update input
interface SaveTeamInput {
  ageClass?: InputMaybe<Scalars['String']>;
  clubId: Scalars['ID'];
  discipline: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  legacyNumber?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  secondaryClubId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Scalars['String']>;
}

// Usage example
const newTeam: SaveTeamInput = {
  clubId: 'club-123',
  name: 'RV Musterhausen I',
  discipline: 'RADBALL',
  ageClass: 'ELITE',
  status: 'ACTIVE'
};
```

### Person

```typescript
// Type definition
interface Person {
  __typename?: 'Person';
  address?: Maybe<Address>;
  birthdate?: Maybe<Scalars['AWSDate']>;
  clubId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['AWSDateTime'];
  email?: Maybe<Scalars['AWSEmail']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  legacyId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['AWSDateTime'];
}

// Address sub-type
interface Address {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
}

// Create/Update input
interface SavePersonInput {
  address?: InputMaybe<AddressInput>;
  birthdate?: InputMaybe<Scalars['AWSDate']>;
  clubId?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['AWSEmail']>;
  firstname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastname?: InputMaybe<Scalars['String']>;
  legacyId?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
}

// Usage example
const newPerson: SavePersonInput = {
  firstname: 'Max',
  lastname: 'Mustermann',
  email: 'max@example.com',
  birthdate: '1990-01-15',
  gender: 'MALE',
  roles: ['PLAYER'],
  address: {
    street: 'Hauptstraße',
    number: '123',
    zip: '12345',
    city: 'Musterhausen',
    country: 'DE'
  }
};
```

### Season

```typescript
// Type definition
interface Season {
  __typename?: 'Season';
  associationId: Scalars['ID'];
  createdAt: Scalars['AWSDateTime'];
  endDate: Scalars['AWSDate'];
  id: Scalars['ID'];
  minimumAgePlayerDate?: Maybe<Scalars['AWSDate']>;
  minimumAgeStaffDate?: Maybe<Scalars['AWSDate']>;
  name: Scalars['String'];
  registrationEndDate?: Maybe<Scalars['AWSDate']>;
  registrationStartDate?: Maybe<Scalars['AWSDate']>;
  startDate: Scalars['AWSDate'];
  updatedAt: Scalars['AWSDateTime'];
}

// Create/Update input
interface SaveSeasonInput {
  associationId: Scalars['ID'];
  endDate: Scalars['AWSDate'];
  id?: InputMaybe<Scalars['ID']>;
  minimumAgePlayerDate?: InputMaybe<Scalars['AWSDate']>;
  minimumAgeStaffDate?: InputMaybe<Scalars['AWSDate']>;
  name: Scalars['String'];
  registrationEndDate?: InputMaybe<Scalars['AWSDate']>;
  registrationStartDate?: InputMaybe<Scalars['AWSDate']>;
  startDate: Scalars['AWSDate'];
}

// Usage example
const newSeason: SaveSeasonInput = {
  associationId: 'association-123',
  name: 'Saison 2024/2025',
  startDate: '2024-09-01',
  endDate: '2025-06-30',
  registrationStartDate: '2024-07-01',
  registrationEndDate: '2024-08-15',
  minimumAgePlayerDate: '2009-01-01'
};
```

### League and LeagueGroup

```typescript
// League type
interface League {
  __typename?: 'League';
  associationId: Scalars['ID'];
  createdAt: Scalars['AWSDateTime'];
  discipline: Scalars['String'];
  id: Scalars['ID'];
  matchDayTemplate?: Maybe<Array<MatchDayTemplateEntry>>;
  matchdayBlockedDates?: Maybe<Array<Scalars['AWSDate']>>;
  matchdayReferenceDate?: Maybe<Scalars['AWSDate']>;
  minPlayerAge?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  seasonId: Scalars['ID'];
  updatedAt: Scalars['AWSDateTime'];
}

// LeagueGroup type
interface LeagueGroup {
  __typename?: 'LeagueGroup';
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  leader?: Maybe<Scalars['ID']>;
  leagueId: Scalars['ID'];
  name: Scalars['String'];
  teams?: Maybe<Array<Scalars['ID']>>;
  updatedAt: Scalars['AWSDateTime'];
}

// Create inputs
interface SaveLeagueInput {
  associationId: Scalars['ID'];
  discipline: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  matchDayTemplate?: InputMaybe<Array<MatchDayTemplateEntryInput>>;
  matchdayBlockedDates?: InputMaybe<Array<Scalars['AWSDate']>>;
  matchdayReferenceDate?: InputMaybe<Scalars['AWSDate']>;
  minPlayerAge?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  seasonId: Scalars['ID'];
}

interface SaveLeagueGroupInput {
  id?: InputMaybe<Scalars['ID']>;
  leader?: InputMaybe<Scalars['ID']>;
  leagueId: Scalars['ID'];
  name: Scalars['String'];
  teams?: InputMaybe<Array<Scalars['ID']>>;
}
```

### Game

```typescript
// Game type
interface Game {
  __typename?: 'Game';
  awayScore?: Maybe<Scalars['Int']>;
  awayTeamId: Scalars['ID'];
  createdAt: Scalars['AWSDateTime'];
  gameNumber: Scalars['Int'];
  homeScore?: Maybe<Scalars['Int']>;
  homeTeamId: Scalars['ID'];
  id: Scalars['ID'];
  matchdayId: Scalars['ID'];
  refereeId?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['AWSDateTime'];
}

// Add game input
interface AddGameInput {
  awayTeamId: Scalars['ID'];
  gameNumber: Scalars['Int'];
  homeTeamId: Scalars['ID'];
  matchdayId: Scalars['ID'];
}
```

## Validation Functions

### Using Check Functions (Non-throwing)

```typescript
import { checkClub, checkPerson, ValidationCheckResult } from '@taimos/radball-digital-api';

// Check functions return ValidationCheckResult
const clubData: SaveClubInput = {
  associationId: 'assoc-123',
  name: '', // Invalid - empty name
  shortName: 'ABC'
};

const result = checkClub(clubData);
if (result.hasErrors()) {
  console.error('Validation errors:', result.errors);
  // Output: { name: ['Name ist erforderlich'] }
}

// Check with warnings
const personData: SavePersonInput = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'invalid-email' // Invalid email format
};

const personResult = checkPerson(personData);
if (personResult.hasErrors() || personResult.hasWarnings()) {
  console.log('Errors:', personResult.errors);
  console.log('Warnings:', personResult.warnings);
}
```

### Using Validate Functions (Throwing)

```typescript
import { validateTeam, validateSeason } from '@taimos/radball-digital-api';

// Validate functions throw on error
const teamData: SaveTeamInput = {
  clubId: 'club-123',
  name: 'Team A',
  discipline: 'RADBALL',
  status: 'ACTIVE'
};

try {
  validateTeam(teamData);
  // If we get here, the team is valid
  console.log('Team is valid');
} catch (error) {
  console.error('Validation failed:', error.message);
}

// Season validation with date checks
const seasonData: SaveSeasonInput = {
  associationId: 'assoc-123',
  name: 'Season 2024',
  startDate: '2024-09-01',
  endDate: '2024-06-01', // Invalid - end before start
  registrationStartDate: '2024-07-01',
  registrationEndDate: '2024-08-15'
};

try {
  validateSeason(seasonData);
} catch (error) {
  // Will throw: "Enddatum muss nach dem Startdatum liegen"
  console.error(error.message);
}
```

### Custom Validation Workflow

```typescript
import { ValidationCheckResult } from '@taimos/radball-digital-api';

// Create custom validation workflow
function validateGameData(game: AddGameInput): ValidationCheckResult {
  const result = new ValidationCheckResult();
  
  // Basic validation
  if (!game.homeTeamId) {
    result.addError('homeTeamId', 'Heimmannschaft ist erforderlich');
  }
  
  if (!game.awayTeamId) {
    result.addError('awayTeamId', 'Gastmannschaft ist erforderlich');
  }
  
  // Business logic validation
  if (game.homeTeamId === game.awayTeamId) {
    result.addError('teams', 'Heim- und Gastmannschaft müssen unterschiedlich sein');
  }
  
  if (game.gameNumber < 1) {
    result.addError('gameNumber', 'Spielnummer muss größer als 0 sein');
  }
  
  return result;
}

// Usage
const gameInput: AddGameInput = {
  homeTeamId: 'team-1',
  awayTeamId: 'team-1', // Same as home
  gameNumber: 0, // Invalid
  matchdayId: 'matchday-123'
};

const validation = validateGameData(gameInput);
if (validation.hasErrors()) {
  // Throw aggregated error
  validation.throwIfErrors();
}
```

## GraphQL Operations

### Query Examples

```typescript
// Type-safe query arguments
import { QueryGetClubByIdArgs, QueryListClubsArgs } from '@taimos/radball-digital-api';

// Single club query
const getClubArgs: QueryGetClubByIdArgs = {
  id: 'club-123'
};

// List clubs with pagination
const listClubsArgs: QueryListClubsArgs = {
  associationId: 'assoc-123',
  limit: 20,
  nextToken: undefined // For pagination
};

// Complex query with filters
const listTeamsArgs = {
  clubId: 'club-123',
  discipline: 'RADBALL',
  status: 'ACTIVE'
};
```

### Mutation Examples

```typescript
// Type-safe mutation arguments
import { 
  MutationAddClubArgs,
  MutationRegisterTeamArgs,
  MutationAddGameArgs 
} from '@taimos/radball-digital-api';

// Add club mutation
const addClubArgs: MutationAddClubArgs = {
  input: {
    associationId: 'assoc-123',
    name: 'New Club',
    shortName: 'NC'
  }
};

// Register team for season
const registerTeamArgs: MutationRegisterTeamArgs = {
  input: {
    teamId: 'team-123',
    leagueGroupId: 'group-456',
    players: ['person-1', 'person-2'],
    preferredMatchdayDates: [
      {
        date: '2024-10-15',
        status: 'PREFERRED'
      },
      {
        date: '2024-10-22',
        status: 'NOT_POSSIBLE'
      }
    ]
  }
};

// Add game to matchday
const addGameArgs: MutationAddGameArgs = {
  input: {
    matchdayId: 'matchday-123',
    homeTeamId: 'team-1',
    awayTeamId: 'team-2',
    gameNumber: 1
  }
};
```

## REST API Usage

### Import Endpoints

```typescript
import { paths, operations } from '@taimos/radball-digital-api';

// Type definitions for import endpoints
type ClubImportRequest = paths['/import/clubs']['post']['requestBody']['content']['text/plain'];
type ClubImportResponse = paths['/import/clubs']['post']['responses']['200']['content']['application/json'];

type GymImportRequest = paths['/import/gyms']['post']['requestBody']['content']['text/plain'];
type PersonImportRequest = paths['/import/persons']['post']['requestBody']['content']['text/csv'];

// Example: Import clubs from fixed-width text
const clubsText = `
001  RV Musterhausen      RVM
002  SC Example           SCE
`;

// Example: Import persons from CSV
const personsCsv = `
firstname,lastname,email,birthdate,clubId
Max,Mustermann,max@example.com,1990-01-15,club-123
Anna,Schmidt,anna@example.com,1992-03-20,club-456
`;
```

## Common Patterns

### Working with Optional Fields

```typescript
// Using Maybe types
function getPersonFullName(person: Person): string {
  const first = person.firstname ?? '';
  const last = person.lastname ?? '';
  return `${first} ${last}`.trim() || 'Unknown';
}

// Handling optional addresses
function formatAddress(address: Maybe<Address>): string {
  if (!address) return 'No address';
  
  const parts = [
    address.street && address.number ? `${address.street} ${address.number}` : '',
    address.zip && address.city ? `${address.zip} ${address.city}` : '',
    address.country
  ].filter(Boolean);
  
  return parts.join(', ') || 'Incomplete address';
}
```

### Date Handling

```typescript
// Working with AWSDate (YYYY-MM-DD format)
function isSeasonActive(season: Season): boolean {
  const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
  return season.startDate <= today && today <= season.endDate;
}

// Registration period check
function isRegistrationOpen(season: Season): boolean {
  if (!season.registrationStartDate || !season.registrationEndDate) {
    return false;
  }
  
  const today = new Date().toISOString().split('T')[0];
  return season.registrationStartDate <= today && today <= season.registrationEndDate;
}

// Age validation
function canPlayerRegister(person: Person, season: Season): boolean {
  if (!person.birthdate || !season.minimumAgePlayerDate) {
    return true; // No age restriction
  }
  
  return person.birthdate <= season.minimumAgePlayerDate;
}
```

### Error Handling

```typescript
import { validateClub, ValidationCheckResult } from '@taimos/radball-digital-api';

// Comprehensive error handling
async function createClub(input: SaveClubInput): Promise<Club | { errors: Record<string, string[]> }> {
  try {
    // Validate input
    validateClub(input);
    
    // Make API call (pseudo-code)
    const result = await apiClient.mutation({
      addClub: {
        input
      }
    });
    
    return result.addClub;
  } catch (error) {
    if (error.message.includes('Validierung fehlgeschlagen')) {
      // Parse validation errors
      const errors = parseValidationErrors(error.message);
      return { errors };
    }
    
    // Re-throw other errors
    throw error;
  }
}

function parseValidationErrors(message: string): Record<string, string[]> {
  // Extract field errors from German validation messages
  const errors: Record<string, string[]> = {};
  const lines = message.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+): (.+)$/);
    if (match) {
      const [, field, error] = match;
      if (!errors[field]) errors[field] = [];
      errors[field].push(error);
    }
  }
  
  return errors;
}
```

### Batch Operations

```typescript
// Register multiple teams
async function registerTeamsForSeason(
  seasonId: string,
  registrations: Array<{ teamId: string; leagueGroupId: string; players: string[] }>
): Promise<void> {
  // Validate all registrations first
  const validationResults = registrations.map(reg => {
    const result = new ValidationCheckResult();
    
    if (!reg.teamId) result.addError('teamId', 'Team ist erforderlich');
    if (!reg.leagueGroupId) result.addError('leagueGroupId', 'Liga-Gruppe ist erforderlich');
    if (!reg.players || reg.players.length < 2) {
      result.addError('players', 'Mindestens 2 Spieler erforderlich');
    }
    
    return { registration: reg, validation: result };
  });
  
  // Check for validation errors
  const errors = validationResults.filter(r => r.validation.hasErrors());
  if (errors.length > 0) {
    throw new Error(`${errors.length} Registrierungen sind ungültig`);
  }
  
  // Process valid registrations
  for (const { registration } of validationResults) {
    await apiClient.mutation({
      registerTeam: {
        input: {
          teamId: registration.teamId,
          leagueGroupId: registration.leagueGroupId,
          players: registration.players
        }
      }
    });
  }
}
```

## Best Practices

1. **Always validate input data** before sending to the API
2. **Use TypeScript types** for type safety
3. **Handle nullable fields** appropriately with Maybe types
4. **Check date ranges** for seasons and registration periods
5. **Validate business rules** (e.g., team can't play against itself)
6. **Use German error messages** as the system is designed for German users
7. **Batch operations** when possible to reduce API calls
8. **Cache frequently accessed data** like associations and clubs

## Common Validation Rules

- **Names**: Required, max 255 characters
- **Short names**: Optional, max 50 characters
- **Emails**: Must be valid email format
- **Dates**: Must be in YYYY-MM-DD format
- **Season dates**: End date must be after start date
- **Registration dates**: Must be within season dates
- **Age restrictions**: Players must meet minimum age requirements
- **Team composition**: Minimum 2 players required
- **Unique constraints**: External IDs and legacy IDs must be unique

## Error Messages (German)

All validation error messages are in German. Common messages:

- "Name ist erforderlich" - Name is required
- "Enddatum muss nach dem Startdatum liegen" - End date must be after start date
- "Ungültiges E-Mail-Format" - Invalid email format
- "Mindestens 2 Spieler erforderlich" - At least 2 players required
- "Verein ist erforderlich" - Club is required
- "Saison ist erforderlich" - Season is required