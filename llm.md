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
  // Core entities
  Association,
  Season,
  League,
  LeagueGroup,
  LeagueGroupView,
  LeagueGroupStatistics,
  Team,
  TeamDetail,
  Club,
  Person,
  Gym,
  Game,
  MatchDay,
  MatchdayTeam,
  RankingEntry,
  PreferredMatchdayDate,
  Address,
  RefereeInfo,

  // Competition/Tournament entities (NEW)
  Competition,
  CompetitionGroup,
  CompetitionTeam,
  CompetitionGroupView,
  CompetitionGroupStatistics,
  CompetitionRegistrationResult,
  CompetitionRegistrationError,
  RegistrationEligibility,

  // Enums
  PreferenceStatus,
  RegistrationPermission,

  // Save inputs (create)
  SaveAssociationInput,
  SaveClubInput,
  SavePersonInput,
  SaveSeasonInput,
  SaveLeagueInput,
  SaveLeagueGroupInput,
  SaveTeamInput,
  SaveGymInput,
  SaveMatchDayInput,
  SaveMatchDayTeamInput,
  SavePreferredMatchdayDateInput,
  SaveCompetitionInput,
  SaveCompetitionGroupInput,
  SaveCompetitionTeamInput,

  // Modify inputs (update)
  ModifyAssociationInput,
  ModifyClubInput,
  ModifyPersonInput,
  ModifySeasonInput,
  ModifyLeagueInput,
  ModifyLeagueGroupInput,
  ModifyTeamInput,
  ModifyGymInput,
  ModifyMatchDayInput,
  ModifyMatchDayTeamInput,
  ModifyGameInput,
  ModifyPreferredMatchdayDateInput,
  ModifyCompetitionInput,
  ModifyCompetitionGroupInput,
  ModifyCompetitionTeamInput,

  // Registration inputs
  RegisterTeamInput,
  RegisterTeamsForSeasonInput,
  RegisterCompetitionTeamInput,
  RegisterCompetitionTeamsInput,

  // Other inputs
  AddGameInput,
  AddressInput,
  RefereeInfoInput,
  UpdateTeamGroupInput,

  // Connection types (pagination)
  ClubConnection,
  GymConnection,
  PersonConnection,

  // Query and Mutation types
  Query,
  Mutation,
  Scalars
} from '@taimos/radball-digital-api';

// Import validation functions
import {
  validateAddress,
  validateAssociation,
  validateClub,
  validateGym,
  validateLeague,
  validateLeagueGroup,
  validatePerson,
  validateSeason,
  validateTeam,
  checkAddress,
  checkAssociation,
  checkClub,
  checkGym,
  checkLeague,
  checkLeagueGroup,
  checkPerson,
  checkSeason,
  checkTeam,
  isSeasonOpenForRegistration,
  ValidationCheckResult,
  REGEX_EMAIL_FORMAT
} from '@taimos/radball-digital-api';

// Import REST API types
import { paths, operations, components } from '@taimos/radball-digital-api';
```

## Type System Overview

### Scalar Types

The library uses AWS AppSync scalar types:

```typescript
type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AWSDate: { input: string; output: string };      // Format: YYYY-MM-DD
  AWSDateTime: { input: string; output: string };  // ISO 8601 format
  AWSEmail: { input: string; output: string };     // Email address
  AWSURL: { input: string; output: string };       // URL string
  AWSPhone: { input: string; output: string };     // Phone number
  AWSTimestamp: { input: string; output: string }; // Unix timestamp
};
```

### Nullable Types

```typescript
// Maybe<T> - Can be T or undefined
type Maybe<T> = T | undefined;

// InputMaybe<T> - For input types
type InputMaybe<T> = T | undefined;
```

## Core Entity Types

### Association

```typescript
// Type definition
interface Association {
  __typename?: 'Association';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  address: Address;
  contactName: Scalars['String']['output'];
  contactEmail: Scalars['AWSEmail']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['AWSURL']['output']>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  competitions?: Maybe<Array<Maybe<Competition>>>;
  coordinators: Array<Maybe<Person>>;
  groupLeaders: Array<Maybe<Person>>;
}

// Create input
interface SaveAssociationInput {
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  address: AddressInput;
  contactName: Scalars['String']['input'];
  contactEmail: Scalars['AWSEmail']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['AWSURL']['input']>;
  coordinators: Array<InputMaybe<Scalars['ID']['input']>>;
}

// Update input
interface ModifyAssociationInput {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  address: AddressInput;
  contactName: Scalars['String']['input'];
  contactEmail: Scalars['AWSEmail']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['AWSURL']['input']>;
  coordinators: Array<InputMaybe<Scalars['ID']['input']>>;
}

// Usage example
const newAssociation: SaveAssociationInput = {
  name: 'Deutscher Radball Verband',
  shortName: 'DRV',
  contactName: 'Max Mustermann',
  contactEmail: 'info@drv.de',
  address: {
    street: 'Hauptstraße 1',
    zip: '12345',
    city: 'Berlin',
    country: 'DE'
  },
  coordinators: []
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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Address>;
  email?: Maybe<Scalars['AWSEmail']['output']>;
  resultServiceEmail?: Maybe<Scalars['AWSEmail']['output']>;
  website?: Maybe<Scalars['AWSURL']['output']>;
  association: Association;
  contact?: Maybe<Person>;
  additionalContacts?: Maybe<Array<Maybe<Person>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
}

// Create input
interface SaveClubInput {
  associationId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
  address: AddressInput;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  resultServiceEmail?: InputMaybe<Scalars['AWSEmail']['input']>;
  website?: InputMaybe<Scalars['AWSURL']['input']>;
  contactId: Scalars['ID']['input'];
  additionalContactIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
}

// Usage example
const newClub: SaveClubInput = {
  associationId: 'association-123',
  name: 'RV Musterhausen',
  shortName: 'RVM',
  contactId: 'person-456',
  address: {
    street: 'Sportplatz 5',
    zip: '54321',
    city: 'Musterhausen',
    country: 'DE'
  }
};
```

### Person

```typescript
// Type definition
interface Person {
  __typename?: 'Person';
  id: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['AWSDate']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  uciCode?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Address>;
  club?: Maybe<Club>;
  subjectId?: Maybe<Scalars['ID']['output']>;
}

// Create input
interface SavePersonInput {
  clubId: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['AWSDate']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  uciCode?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<AddressInput>;
}

// Usage example
const newPerson: SavePersonInput = {
  clubId: 'club-123',
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max@example.com',
  dateOfBirth: '1990-01-15',
  gender: 'MALE',
  address: {
    street: 'Hauptstraße 123',
    zip: '12345',
    city: 'Musterhausen',
    country: 'DE'
  }
};
```

### Address

```typescript
// Type definition
interface Address {
  __typename?: 'Address';
  street?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
}

// Input type
interface AddressInput {
  street?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
}
```

### Season

```typescript
// Type definition
interface Season {
  __typename?: 'Season';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['AWSDate']['output'];
  endDate: Scalars['AWSDate']['output'];
  registrationStart?: Maybe<Scalars['AWSDate']['output']>;
  registrationEnd: Scalars['AWSDate']['output'];
  leagueOrder?: Maybe<Array<Scalars['ID']['output']>>;
  regulationFileUrl?: Maybe<Scalars['AWSURL']['output']>;
  association: Association;
  leagues?: Maybe<Array<Maybe<League>>>;
  additionalEligibleAssociations?: Maybe<Array<Maybe<Association>>>;
}

// Create input
interface SaveSeasonInput {
  associationId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  startDate: Scalars['AWSDate']['input'];
  endDate: Scalars['AWSDate']['input'];
  registrationStart?: InputMaybe<Scalars['AWSDate']['input']>;
  registrationEnd: Scalars['AWSDate']['input'];
  additionalEligibleAssociations: Array<InputMaybe<Scalars['ID']['input']>>;
}

// Update input (includes leagueOrder)
interface ModifySeasonInput {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  startDate: Scalars['AWSDate']['input'];
  endDate: Scalars['AWSDate']['input'];
  registrationStart?: InputMaybe<Scalars['AWSDate']['input']>;
  registrationEnd: Scalars['AWSDate']['input'];
  leagueOrder?: InputMaybe<Array<Scalars['ID']['input']>>;
  regulationFileUrl?: InputMaybe<Scalars['AWSURL']['input']>;
  additionalEligibleAssociations: Array<InputMaybe<Scalars['ID']['input']>>;
}

// Usage example
const newSeason: SaveSeasonInput = {
  associationId: 'association-123',
  name: 'Saison 2024/2025',
  startDate: '2024-09-01',
  endDate: '2025-06-30',
  registrationStart: '2024-07-01',
  registrationEnd: '2024-08-15',
  additionalEligibleAssociations: []
};
```

### League

```typescript
// Type definition
interface League {
  __typename?: 'League';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  minAge?: Maybe<Scalars['Int']['output']>;
  maxAge?: Maybe<Scalars['Int']['output']>;
  matchdayDates?: Maybe<Array<Scalars['AWSDate']['output']>>;
  season: Season;
  association: Association;
  groups?: Maybe<Array<Maybe<LeagueGroup>>>;
}

// Create input
interface SaveLeagueInput {
  seasonId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  minAge?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  matchdayDates?: InputMaybe<Array<Scalars['AWSDate']['input']>>;
}
```

### LeagueGroup

```typescript
// Type definition
interface LeagueGroup {
  __typename?: 'LeagueGroup';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  regulation: Scalars['String']['output'];
  league: League;
  season: Season;
  association: Association;
  leader?: Maybe<Person>;
}

// Create input
interface SaveLeagueGroupInput {
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  number: Scalars['Int']['input'];
  regulation: Scalars['String']['input'];
  groupLeaderId?: InputMaybe<Scalars['ID']['input']>;
}
```

### Team

```typescript
// Type definition
interface Team {
  __typename?: 'Team';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  club: Club;
  league: League;
  leagueGroup?: Maybe<LeagueGroup>;
  players: Array<Maybe<Person>>;
  exemptionRequest?: Maybe<Scalars['String']['output']>;
  secondRightToPlay?: Maybe<Scalars['Boolean']['output']>;
  withoutCompetition?: Maybe<Scalars['Boolean']['output']>;
  sgClub?: Maybe<Club>;
}

// Create input
interface SaveTeamInput {
  clubId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  leagueGroupId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  playerIds: Array<InputMaybe<Scalars['ID']['input']>>;
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
}

// Register team input (for season registration)
interface RegisterTeamInput {
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  playerIds: Array<Scalars['ID']['input']>;
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
}

// Bulk registration input
interface RegisterTeamsForSeasonInput {
  clubId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
  teams: Array<RegisterTeamInput>;
  preferredDates?: InputMaybe<Array<InputMaybe<SavePreferredMatchdayDateInput>>>;
}

// Usage example
const newTeam: SaveTeamInput = {
  clubId: 'club-123',
  leagueId: 'league-456',
  name: 'RV Musterhausen I',
  playerIds: ['person-1', 'person-2']
};
```

### TeamDetail (Enhanced Team View)

```typescript
interface TeamDetail {
  __typename?: 'TeamDetail';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  club: Club;
  players: Array<Maybe<Person>>;
  preferredDates?: Maybe<Array<Maybe<PreferredMatchdayDate>>>;
  exemptionRequest?: Maybe<Scalars['String']['output']>;
  secondRightToPlay?: Maybe<Scalars['Boolean']['output']>;
  withoutCompetition?: Maybe<Scalars['Boolean']['output']>;
  sgClub?: Maybe<Club>;
}
```

### Gym

```typescript
// Type definition
interface Gym {
  __typename?: 'Gym';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  availableFields: Scalars['String']['output'];
  address: Address;
  club: Club;
}

// Create input
interface SaveGymInput {
  clubId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  availableFields: Scalars['String']['input'];
  address: AddressInput;
}
```

### Game and MatchDay

```typescript
// Game type
interface Game {
  __typename?: 'Game';
  gameNumber: Scalars['Int']['output'];
  team1: MatchdayTeam;
  team2: MatchdayTeam;
  halftimeGoalsTeam1?: Maybe<Scalars['Int']['output']>;
  halftimeGoalsTeam2?: Maybe<Scalars['Int']['output']>;
  finalGoalsTeam1?: Maybe<Scalars['Int']['output']>;
  finalGoalsTeam2?: Maybe<Scalars['Int']['output']>;
  pointsTeam1?: Maybe<Scalars['Int']['output']>;
  pointsTeam2?: Maybe<Scalars['Int']['output']>;
  bothLost?: Maybe<Scalars['Boolean']['output']>;
  nonCompetitive?: Maybe<Scalars['Boolean']['output']>;
}

// MatchDay type
interface MatchDay {
  __typename?: 'MatchDay';
  id: Scalars['ID']['output'];
  matchDayNumber: Scalars['String']['output'];
  startDate: Scalars['AWSDateTime']['output'];
  endDate: Scalars['AWSDateTime']['output'];
  group: LeagueGroup;
  gym: Gym;
  teams: Array<Maybe<MatchdayTeam>>;
  games: Array<Maybe<Game>>;
  secretary: Scalars['String']['output'];
  commissioners?: Maybe<RefereeInfo>;
  report?: Maybe<Scalars['String']['output']>;
  reportAttachments?: Maybe<Array<Maybe<Scalars['AWSURL']['output']>>>;
  streamingLink?: Maybe<Scalars['AWSURL']['output']>;
  pin?: Maybe<Scalars['String']['output']>;
}

// MatchdayTeam type
interface MatchdayTeam {
  __typename?: 'MatchdayTeam';
  id: Scalars['ID']['output'];
  team: Team;
  present: Scalars['Boolean']['output'];
  substitutePlayer?: Maybe<Person>;
}

// Add game input
interface AddGameInput {
  gameNumber: Scalars['Int']['input'];
  team1Id: Scalars['ID']['input'];
  team2Id: Scalars['ID']['input'];
}

// Modify game input
interface ModifyGameInput {
  id: Scalars['ID']['input'];
  halftimeGoalsTeam1?: InputMaybe<Scalars['Int']['input']>;
  halftimeGoalsTeam2?: InputMaybe<Scalars['Int']['input']>;
  finalGoalsTeam1?: InputMaybe<Scalars['Int']['input']>;
  finalGoalsTeam2?: InputMaybe<Scalars['Int']['input']>;
  pointsTeam1?: InputMaybe<Scalars['Int']['input']>;
  pointsTeam2?: InputMaybe<Scalars['Int']['input']>;
  bothLost?: InputMaybe<Scalars['Boolean']['input']>;
  nonCompetitive?: InputMaybe<Scalars['Boolean']['input']>;
}
```

### RankingEntry

```typescript
interface RankingEntry {
  __typename?: 'RankingEntry';
  rank: Scalars['Int']['output'];
  team: Team;
  games: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  goalsPlus: Scalars['Int']['output'];
  goalsMinus: Scalars['Int']['output'];
  goalsDiff: Scalars['Int']['output'];
}
```

### PreferredMatchdayDate

```typescript
interface PreferredMatchdayDate {
  __typename?: 'PreferredMatchdayDate';
  preferenceDate: Scalars['AWSDate']['output'];
  status: PreferenceStatus;
  notes?: Maybe<Scalars['String']['output']>;
  club: Club;
  league: League;
  season: Season;
  gym?: Maybe<Gym>;
}

interface SavePreferredMatchdayDateInput {
  clubId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  preferenceDate: Scalars['AWSDate']['input'];
  status: PreferenceStatus;
  notes?: InputMaybe<Scalars['String']['input']>;
  gymId?: InputMaybe<Scalars['ID']['input']>;
}

// PreferenceStatus enum
enum PreferenceStatus {
  Available = 'AVAILABLE',
  Preferred = 'PREFERRED'
}
```

## Competition Types (Tournaments/Wettbewerbe)

Competitions are standalone tournaments that are NOT tied to a Season. They have their own registration periods and access control.

### Competition

```typescript
// Type definition
interface Competition {
  __typename?: 'Competition';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  association: Association;
  startDate: Scalars['AWSDate']['output'];
  endDate: Scalars['AWSDate']['output'];
  registrationStart: Scalars['AWSDate']['output'];
  registrationEnd: Scalars['AWSDate']['output'];
  registrationPermission: RegistrationPermission;
  allowedRegistrars?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  minAge?: Maybe<Scalars['Int']['output']>;
  maxAge?: Maybe<Scalars['Int']['output']>;
  groups?: Maybe<Array<Maybe<CompetitionGroup>>>;
  coordinators?: Maybe<Array<Maybe<Person>>>;
  regulationFileUrl?: Maybe<Scalars['AWSURL']['output']>;
}

// Create input
interface SaveCompetitionInput {
  associationId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['AWSDate']['input'];
  endDate: Scalars['AWSDate']['input'];
  registrationStart: Scalars['AWSDate']['input'];
  registrationEnd: Scalars['AWSDate']['input'];
  registrationPermission?: InputMaybe<RegistrationPermission>;
  allowedRegistrars?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  coordinatorIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  regulationFileUrl?: InputMaybe<Scalars['AWSURL']['input']>;
}

// Update input
interface ModifyCompetitionInput {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['AWSDate']['input']>;
  endDate?: InputMaybe<Scalars['AWSDate']['input']>;
  registrationStart?: InputMaybe<Scalars['AWSDate']['input']>;
  registrationEnd?: InputMaybe<Scalars['AWSDate']['input']>;
  registrationPermission?: InputMaybe<RegistrationPermission>;
  allowedRegistrars?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  coordinatorIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  regulationFileUrl?: InputMaybe<Scalars['AWSURL']['input']>;
}

// RegistrationPermission enum - Controls who can register for a competition
enum RegistrationPermission {
  AllClubs = 'ALL_CLUBS',           // Any club can register
  AssociationsOnly = 'ASSOCIATIONS_ONLY', // Only associations can register teams
  InviteOnly = 'INVITE_ONLY'        // Only specifically allowed registrars
}

// Usage example
const newCompetition: SaveCompetitionInput = {
  associationId: 'association-123',
  name: 'Deutsche Meisterschaft 2024',
  shortName: 'DM2024',
  description: 'Jährliche Deutsche Meisterschaft im Radball',
  startDate: '2024-06-01',
  endDate: '2024-06-02',
  registrationStart: '2024-03-01',
  registrationEnd: '2024-05-15',
  registrationPermission: RegistrationPermission.AssociationsOnly
};
```

### CompetitionGroup

```typescript
// Type definition
interface CompetitionGroup {
  __typename?: 'CompetitionGroup';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  regulation: Scalars['String']['output'];
  competition: Competition;
  association: Association;
  leader?: Maybe<Person>;
  teams?: Maybe<Array<Maybe<CompetitionTeam>>>;
}

// Create input
interface SaveCompetitionGroupInput {
  competitionId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  number: Scalars['Int']['input'];
  regulation: Scalars['String']['input'];
  leaderId?: InputMaybe<Scalars['ID']['input']>;
}

// Update input
interface ModifyCompetitionGroupInput {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  regulation?: InputMaybe<Scalars['String']['input']>;
  leaderId?: InputMaybe<Scalars['ID']['input']>;
}
```

### CompetitionTeam

```typescript
// Type definition
interface CompetitionTeam {
  __typename?: 'CompetitionTeam';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  club: Club;
  competition: Competition;
  competitionGroup?: Maybe<CompetitionGroup>;
  players: Array<Maybe<Person>>;
  exemptionRequest?: Maybe<Scalars['String']['output']>;
  secondRightToPlay?: Maybe<Scalars['Boolean']['output']>;
  withoutCompetition?: Maybe<Scalars['Boolean']['output']>;
  sgClub?: Maybe<Club>;
}

// Create input
interface SaveCompetitionTeamInput {
  competitionId: Scalars['ID']['input'];
  competitionGroupId?: InputMaybe<Scalars['ID']['input']>;
  clubId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  playerIds: Array<Scalars['ID']['input']>;
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
}

// Update input
interface ModifyCompetitionTeamInput {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  competitionGroupId?: InputMaybe<Scalars['ID']['input']>;
  playerIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
}

// Register single team input
interface RegisterCompetitionTeamInput {
  clubId: Scalars['ID']['input'];
  competitionGroupId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  playerIds: Array<Scalars['ID']['input']>;
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
}

// Bulk registration input (for federations registering multiple teams)
interface RegisterCompetitionTeamsInput {
  competitionId: Scalars['ID']['input'];
  registrarClubId: Scalars['ID']['input'];
  registrarPersonId: Scalars['ID']['input'];
  teams: Array<RegisterCompetitionTeamInput>;
}
```

### Competition Registration Result

```typescript
// Bulk registration result
interface CompetitionRegistrationResult {
  __typename?: 'CompetitionRegistrationResult';
  success: Scalars['Boolean']['output'];
  registeredTeams: Array<Maybe<CompetitionTeam>>;
  errors: Array<Maybe<CompetitionRegistrationError>>;
}

interface CompetitionRegistrationError {
  __typename?: 'CompetitionRegistrationError';
  errorCode: Scalars['String']['output'];
  message: Scalars['String']['output'];
  teamName: Scalars['String']['output'];
  clubId?: Maybe<Scalars['ID']['output']>;
}

// Registration eligibility check
interface RegistrationEligibility {
  __typename?: 'RegistrationEligibility';
  canRegister: Scalars['Boolean']['output'];
  registrationOpen: Scalars['Boolean']['output'];
  registrationEnds?: Maybe<Scalars['AWSDate']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
}
```

### CompetitionGroupView

```typescript
interface CompetitionGroupView {
  __typename?: 'CompetitionGroupView';
  competitionGroup: CompetitionGroup;
  teams: Array<Maybe<TeamDetail>>;
  clubs: Array<Maybe<Club>>;
  gyms: Array<Maybe<Gym>>;
  statistics?: Maybe<CompetitionGroupStatistics>;
}

interface CompetitionGroupStatistics {
  __typename?: 'CompetitionGroupStatistics';
  totalTeams: Scalars['Int']['output'];
  totalPlayers: Scalars['Int']['output'];
  totalClubs: Scalars['Int']['output'];
  totalGyms: Scalars['Int']['output'];
}
```

## View Types

### LeagueGroupView

```typescript
interface LeagueGroupView {
  __typename?: 'LeagueGroupView';
  group: LeagueGroup;
  teams: Array<Maybe<TeamDetail>>;
  clubs: Array<Maybe<Club>>;
  gyms: Array<Maybe<Gym>>;
  statistics?: Maybe<LeagueGroupStatistics>;
}

interface LeagueGroupStatistics {
  __typename?: 'LeagueGroupStatistics';
  totalTeams: Scalars['Int']['output'];
  totalPlayers: Scalars['Int']['output'];
  totalClubs: Scalars['Int']['output'];
  totalGyms: Scalars['Int']['output'];
}
```

## Validation Functions

### Using Check Functions (Non-throwing)

Check functions validate input and return a `ValidationCheckResult` object with errors and warnings.

```typescript
import {
  checkClub,
  checkPerson,
  checkSeason,
  checkLeague,
  checkLeagueGroup,
  checkTeam,
  checkGym,
  checkAddress,
  checkAssociation,
  ValidationCheckResult
} from '@taimos/radball-digital-api';

// Check functions return ValidationCheckResult
const clubData: SaveClubInput = {
  associationId: 'assoc-123',
  name: '', // Invalid - empty name
  shortName: 'ABC',
  contactId: 'person-123',
  address: { city: 'Berlin', country: 'DE', street: 'Hauptstr. 1', zip: '12345' }
};

const result = checkClub(clubData);
if (Object.keys(result.errors).length > 0) {
  console.error('Validation errors:', result.errors);
  // Output: { name: ['Vereinsname ist erforderlich'] }
}

// Check with warnings
const personData: SavePersonInput = {
  clubId: 'club-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'invalid-email' // Invalid email format
};

const personResult = checkPerson(personData);
if (Object.keys(personResult.errors).length > 0) {
  console.log('Errors:', personResult.errors);
  console.log('Error messages:', personResult.getErrorMessagesString());
}
```

### ValidationCheckResult Class

```typescript
class ValidationCheckResult {
  public readonly warnings: { [field: string]: string[] } = {};
  public readonly errors: { [field: string]: string[] } = {};

  public addWarning(field: string, message: string): void;
  public addError(field: string, message: string): void;
  public getErrorMessages(): string[];
  public getWarningMessages(): string[];
  public getErrorMessagesString(): string;
  public getWarningMessagesString(): string;
  public validate(): void; // Throws if errors exist
}
```

### Using Validate Functions (Throwing)

Validate functions throw an error if validation fails.

```typescript
import { validateTeam, validateSeason, validateClub } from '@taimos/radball-digital-api';

// Validate functions throw on error
const teamData: SaveTeamInput = {
  clubId: 'club-123',
  leagueId: 'league-456',
  name: 'Team A',
  playerIds: ['person-1', 'person-2']
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
  registrationEnd: '2024-08-15',
  additionalEligibleAssociations: []
};

try {
  validateSeason(seasonData);
} catch (error) {
  // Will throw: "Saison-Enddatum muss nach dem Startdatum liegen"
  console.error(error.message);
}
```

### Season Registration Check

```typescript
import { isSeasonOpenForRegistration } from '@taimos/radball-digital-api';

// Check if registration is currently open
const season: SaveSeasonInput = {
  associationId: 'assoc-123',
  name: 'Season 2024/2025',
  startDate: '2024-09-01',
  endDate: '2025-06-30',
  registrationStart: '2024-07-01',
  registrationEnd: '2024-08-15',
  additionalEligibleAssociations: []
};

const today = '2024-07-15';
const isOpen = isSeasonOpenForRegistration(season, today);
console.log('Registration open:', isOpen); // true
```

### Available Validation Functions

| Entity | Check Function | Validate Function |
|--------|----------------|-------------------|
| Address | `checkAddress(address)` | `validateAddress(address)` |
| Association | `checkAssociation(association)` | `validateAssociation(association)` |
| Club | `checkClub(club)` | `validateClub(club)` |
| Gym | `checkGym(gym)` | `validateGym(gym)` |
| League | `checkLeague(league)` | `validateLeague(league)` |
| LeagueGroup | `checkLeagueGroup(leagueGroup)` | `validateLeagueGroup(leagueGroup)` |
| Person | `checkPerson(person)` | `validatePerson(person)` |
| Season | `checkSeason(season)` | `validateSeason(season)` |
| Team | `checkTeam(team)` | `validateTeam(team)` |

### Email Validation Regex

```typescript
import { REGEX_EMAIL_FORMAT } from '@taimos/radball-digital-api';

const isValidEmail = REGEX_EMAIL_FORMAT.test('user@example.com'); // true
```

## GraphQL Operations

### Query Examples

```typescript
// Type-safe query arguments
import {
  QueryGetClubByIdArgs,
  QueryGetListOfClubsArgs,
  QueryGetCompetitionByIdArgs,
  QueryCanClubRegisterForCompetitionArgs
} from '@taimos/radball-digital-api';

// Single club query
const getClubArgs: QueryGetClubByIdArgs = {
  id: 'club-123'
};

// List clubs with pagination
const listClubsArgs: QueryGetListOfClubsArgs = {
  limit: 20,
  nextToken: undefined // For pagination
};

// Get competition
const getCompetitionArgs: QueryGetCompetitionByIdArgs = {
  id: 'competition-123'
};

// Check registration eligibility
const canRegisterArgs: QueryCanClubRegisterForCompetitionArgs = {
  clubId: 'club-123',
  competitionId: 'competition-456'
};
```

### Mutation Examples

```typescript
// Type-safe mutation arguments
import {
  MutationAddClubArgs,
  MutationRegisterTeamsForSeasonArgs,
  MutationAddGameToMatchDayArgs,
  MutationAddCompetitionArgs,
  MutationRegisterCompetitionTeamsArgs
} from '@taimos/radball-digital-api';

// Add club mutation
const addClubArgs: MutationAddClubArgs = {
  club: {
    associationId: 'assoc-123',
    name: 'New Club',
    shortName: 'NC',
    contactId: 'person-123',
    address: {
      street: 'Hauptstr. 1',
      zip: '12345',
      city: 'Berlin',
      country: 'DE'
    }
  }
};

// Register teams for season
const registerTeamsArgs: MutationRegisterTeamsForSeasonArgs = {
  registration: {
    clubId: 'club-123',
    seasonId: 'season-456',
    teams: [
      {
        leagueId: 'league-789',
        name: 'RV Musterhausen I',
        playerIds: ['person-1', 'person-2']
      }
    ],
    preferredDates: [
      {
        clubId: 'club-123',
        leagueId: 'league-789',
        preferenceDate: '2024-10-15',
        status: PreferenceStatus.Preferred
      }
    ]
  }
};

// Add game to matchday
const addGameArgs: MutationAddGameToMatchDayArgs = {
  matchDayId: 'matchday-123',
  game: {
    gameNumber: 1,
    team1Id: 'matchdayteam-1',
    team2Id: 'matchdayteam-2'
  }
};

// Add competition
const addCompetitionArgs: MutationAddCompetitionArgs = {
  competition: {
    associationId: 'assoc-123',
    name: 'Deutsche Meisterschaft 2024',
    shortName: 'DM2024',
    startDate: '2024-06-01',
    endDate: '2024-06-02',
    registrationStart: '2024-03-01',
    registrationEnd: '2024-05-15',
    registrationPermission: RegistrationPermission.AssociationsOnly
  }
};

// Bulk register teams for competition (federation use case)
const registerCompetitionTeamsArgs: MutationRegisterCompetitionTeamsArgs = {
  registration: {
    competitionId: 'competition-123',
    registrarClubId: 'association-club-id',
    registrarPersonId: 'registrar-person-id',
    teams: [
      {
        clubId: 'club-1',
        name: 'RV Club 1 I',
        playerIds: ['person-1', 'person-2']
      },
      {
        clubId: 'club-2',
        name: 'RV Club 2 I',
        playerIds: ['person-3', 'person-4']
      }
    ]
  }
};
```

## Common Patterns

### Working with Optional Fields

```typescript
// Using Maybe types
function getPersonFullName(person: Person): string {
  const first = person.firstName ?? '';
  const last = person.lastName ?? '';
  return `${first} ${last}`.trim() || 'Unknown';
}

// Handling optional addresses
function formatAddress(address: Maybe<Address>): string {
  if (!address) return 'No address';

  const parts = [
    address.street,
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
  if (!season.registrationStart || !season.registrationEnd) {
    return false;
  }

  const today = new Date().toISOString().split('T')[0];
  return season.registrationStart <= today && today <= season.registrationEnd;
}

// Competition registration check
function isCompetitionRegistrationOpen(competition: Competition): boolean {
  const today = new Date().toISOString().split('T')[0];
  return competition.registrationStart <= today && today <= competition.registrationEnd;
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
        club: input
      }
    });

    return result.addClub;
  } catch (error) {
    if (error.message) {
      // Parse validation errors
      return { errors: { validation: [error.message] } };
    }

    // Re-throw other errors
    throw error;
  }
}
```

### League Group Manager View

```typescript
// Query for league group manager
async function exportLeagueGroupData(groupId: string): Promise<void> {
  const groupView = await apiClient.query({
    getLeagueGroupView: {
      groupId
    }
  });

  // Export teams with all players
  const teamsExport = groupView.teams.map(team => ({
    name: team.name,
    club: team.club.name,
    players: team.players.map(p => `${p.firstName} ${p.lastName}`),
    withoutCompetition: team.withoutCompetition,
    preferredDates: team.preferredDates
  }));

  // Export statistics
  const stats = groupView.statistics;
  console.log(`Total Teams: ${stats?.totalTeams}`);
  console.log(`Total Players: ${stats?.totalPlayers}`);
  console.log(`Total Clubs: ${stats?.totalClubs}`);
  console.log(`Total Gyms: ${stats?.totalGyms}`);
}
```

### Competition Registration Workflow

```typescript
// Check if club can register for competition
async function checkAndRegisterForCompetition(
  clubId: string,
  competitionId: string,
  teams: RegisterCompetitionTeamInput[]
): Promise<CompetitionRegistrationResult> {
  // First, check eligibility
  const eligibility = await apiClient.query({
    canClubRegisterForCompetition: {
      clubId,
      competitionId
    }
  });

  if (!eligibility.canRegister) {
    throw new Error(`Registration not allowed: ${eligibility.reason}`);
  }

  if (!eligibility.registrationOpen) {
    throw new Error('Registration period is closed');
  }

  // Proceed with registration
  const result = await apiClient.mutation({
    registerCompetitionTeams: {
      registration: {
        competitionId,
        registrarClubId: clubId,
        registrarPersonId: 'current-user-id',
        teams
      }
    }
  });

  if (!result.success) {
    console.error('Some registrations failed:', result.errors);
  }

  return result;
}
```

### Batch Operations

```typescript
// Register multiple teams for a season
async function registerTeamsForSeason(
  clubId: string,
  seasonId: string,
  registrations: Array<{ leagueId: string; name: string; playerIds: string[] }>
): Promise<Team[]> {
  // Validate all registrations first
  for (const reg of registrations) {
    const result = checkTeam({
      clubId,
      leagueId: reg.leagueId,
      name: reg.name,
      playerIds: reg.playerIds
    });

    if (Object.keys(result.errors).length > 0) {
      throw new Error(`Validation failed for ${reg.name}: ${result.getErrorMessagesString()}`);
    }
  }

  // Process registrations
  const response = await apiClient.mutation({
    registerTeamsForSeason: {
      registration: {
        clubId,
        seasonId,
        teams: registrations.map(reg => ({
          leagueId: reg.leagueId,
          name: reg.name,
          playerIds: reg.playerIds
        }))
      }
    }
  });

  return response.registerTeamsForSeason ?? [];
}
```

## Best Practices

1. **Always validate input data** before sending to the API using check or validate functions
2. **Use TypeScript types** for type safety and autocompletion
3. **Handle nullable fields** appropriately with Maybe types
4. **Check date ranges** for seasons, competitions, and registration periods
5. **Validate business rules** (e.g., team must have at least 2 players)
6. **Use German error messages** as the system is designed for German users
7. **Batch operations** when possible to reduce API calls
8. **Check registration eligibility** before attempting competition registrations
9. **Handle pagination** for large lists using nextToken

## Common Validation Rules

- **Names**: Required, max 100 characters
- **Short names**: Max 10-30 characters, alphanumeric only for some entities
- **Emails**: Must match email format regex
- **Dates**: Must be in YYYY-MM-DD format (AWSDate)
- **Season dates**: End date must be after start date
- **Registration dates**: Must be before season/competition start date
- **Age restrictions**: minAge must be less than maxAge
- **Team composition**: Minimum 2 players required
- **Address fields**: Max 200 characters for street/city, 20 for zip/country

## Error Messages (German)

All validation error messages are in German. Common messages:

- "Name ist erforderlich" - Name is required
- "Vereinsname ist erforderlich" - Club name is required
- "Verbandsname ist erforderlich" - Association name is required
- "Saisonname ist erforderlich" - Season name is required
- "Liganame ist erforderlich" - League name is required
- "Staffelname ist erforderlich" - League group name is required
- "Hallenname ist erforderlich" - Gym name is required
- "Teamname ist erforderlich" - Team name is required
- "Vorname ist erforderlich" - First name is required
- "Nachname ist erforderlich" - Last name is required
- "Saison-Enddatum muss nach dem Startdatum liegen" - Season end date must be after start date
- "Anmeldungsende muss nach dem Anmeldungsstart liegen" - Registration end must be after registration start
- "Ungültiges E-Mail-Format" - Invalid email format
- "Es müssen mindestens 2 Spieler für ein Team angegeben werden" - At least 2 players must be specified for a team
- "Maximalalter muss größer oder gleich dem Mindestalter sein" - Max age must be greater than or equal to min age
- "Stadt ist erforderlich" - City is required
- "Land ist erforderlich" - Country is required
- "Straße ist erforderlich" - Street is required
- "PLZ ist erforderlich" - Postal code is required
