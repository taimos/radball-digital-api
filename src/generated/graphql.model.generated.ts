export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: string; output: string; }
  AWSURL: { input: string; output: string; }
  BigInt: { input: any; output: any; }
  Double: { input: any; output: any; }
};

export type AddGameInput = {
  gameNumber: Scalars['Int']['input'];
  team1Id: Scalars['ID']['input'];
  team2Id: Scalars['ID']['input'];
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type Association = {
  __typename?: 'Association';
  address: Address;
  contactEmail: Scalars['AWSEmail']['output'];
  contactName: Scalars['String']['output'];
  coordinators: Array<Maybe<Person>>;
  groupLeaders: Array<Maybe<Person>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  shortName: Scalars['String']['output'];
  website?: Maybe<Scalars['AWSURL']['output']>;
};

export type AuditLogEntry = {
  __typename?: 'AuditLogEntry';
  actorId: Scalars['String']['output'];
  actorName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  timestamp: Scalars['AWSDateTime']['output'];
};

export type Club = {
  __typename?: 'Club';
  address?: Maybe<Address>;
  association: Association;
  contact?: Maybe<Person>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  teams?: Maybe<Array<Maybe<Team>>>;
  website?: Maybe<Scalars['AWSURL']['output']>;
};

export type Game = {
  __typename?: 'Game';
  bothLost?: Maybe<Scalars['Boolean']['output']>;
  finalGoalsTeam1?: Maybe<Scalars['Int']['output']>;
  finalGoalsTeam2?: Maybe<Scalars['Int']['output']>;
  gameNumber: Scalars['Int']['output'];
  halftimeGoalsTeam1?: Maybe<Scalars['Int']['output']>;
  halftimeGoalsTeam2?: Maybe<Scalars['Int']['output']>;
  nonCompetitive?: Maybe<Scalars['Boolean']['output']>;
  pointsTeam1?: Maybe<Scalars['Int']['output']>;
  pointsTeam2?: Maybe<Scalars['Int']['output']>;
  team1: MatchdayTeam;
  team2: MatchdayTeam;
};

export type Gym = {
  __typename?: 'Gym';
  address: Address;
  availableFields: Scalars['String']['output'];
  club: Club;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type League = {
  __typename?: 'League';
  additionalEligibleAssociations?: Maybe<Array<Maybe<Association>>>;
  association: Association;
  description: Scalars['String']['output'];
  groups?: Maybe<Array<Maybe<LeagueGroup>>>;
  id: Scalars['ID']['output'];
  matchdayDates?: Maybe<Array<Scalars['AWSDate']['output']>>;
  maxAge?: Maybe<Scalars['Int']['output']>;
  minAge?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  season: Season;
  shortName?: Maybe<Scalars['String']['output']>;
};

export type LeagueGroup = {
  __typename?: 'LeagueGroup';
  association: Association;
  id: Scalars['ID']['output'];
  leader: Person;
  league: League;
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  regulation: Scalars['String']['output'];
  season: Season;
  shortName: Scalars['String']['output'];
};

export type MatchDay = {
  __typename?: 'MatchDay';
  commissioners?: Maybe<RefereeInfo>;
  endDate: Scalars['AWSDateTime']['output'];
  games: Array<Maybe<Game>>;
  group: LeagueGroup;
  gym: Gym;
  id: Scalars['ID']['output'];
  matchDayNumber: Scalars['String']['output'];
  pin?: Maybe<Scalars['String']['output']>;
  report?: Maybe<Scalars['String']['output']>;
  secretary: Scalars['String']['output'];
  startDate: Scalars['AWSDateTime']['output'];
  streamingLink?: Maybe<Scalars['AWSURL']['output']>;
  teams: Array<Maybe<MatchdayTeam>>;
};

export type MatchdayTeam = {
  __typename?: 'MatchdayTeam';
  id: Scalars['ID']['output'];
  present: Scalars['Boolean']['output'];
  substitutePlayer?: Maybe<Person>;
  team: Team;
};

export type ModifyAssociationInput = {
  address: AddressInput;
  contactEmail: Scalars['AWSEmail']['input'];
  contactName: Scalars['String']['input'];
  coordinators: Array<InputMaybe<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  shortName: Scalars['String']['input'];
  website?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type ModifyClubInput = {
  address: AddressInput;
  contactId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type ModifyGameInput = {
  bothLost?: InputMaybe<Scalars['Boolean']['input']>;
  finalGoalsTeam1?: InputMaybe<Scalars['Int']['input']>;
  finalGoalsTeam2?: InputMaybe<Scalars['Int']['input']>;
  halftimeGoalsTeam1?: InputMaybe<Scalars['Int']['input']>;
  halftimeGoalsTeam2?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  nonCompetitive?: InputMaybe<Scalars['Boolean']['input']>;
  pointsTeam1?: InputMaybe<Scalars['Int']['input']>;
  pointsTeam2?: InputMaybe<Scalars['Int']['input']>;
};

export type ModifyGymInput = {
  address: AddressInput;
  availableFields: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ModifyLeagueGroupInput = {
  groupLeaderId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  number: Scalars['Int']['input'];
  regulation: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type ModifyLeagueInput = {
  additionalEligibleAssociations: Array<InputMaybe<Scalars['ID']['input']>>;
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  matchdayDates?: InputMaybe<Array<Scalars['AWSDate']['input']>>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
};

export type ModifyMatchDayInput = {
  commissioners?: InputMaybe<RefereeInfoInput>;
  endDate: Scalars['AWSDateTime']['input'];
  gymId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  matchDayNumber: Scalars['String']['input'];
  report?: InputMaybe<Scalars['String']['input']>;
  secretary: Scalars['String']['input'];
  startDate: Scalars['AWSDateTime']['input'];
  streamingLink?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type ModifyMatchDayTeamInput = {
  present: Scalars['Boolean']['input'];
  substitutePlayerId?: InputMaybe<Scalars['ID']['input']>;
};

export type ModifyPersonInput = {
  address?: InputMaybe<AddressInput>;
  clubId: Scalars['ID']['input'];
  dateOfBirth?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  uciCode?: InputMaybe<Scalars['String']['input']>;
};

export type ModifyPreferredMatchdayDateInput = {
  clubId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  preferenceDate: Scalars['AWSDate']['input'];
  status: PreferenceStatus;
};

export type ModifySeasonInput = {
  endDate: Scalars['AWSDate']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  registrationEnd: Scalars['AWSDate']['input'];
  registrationStart?: InputMaybe<Scalars['AWSDate']['input']>;
  startDate: Scalars['AWSDate']['input'];
};

export type ModifyTeamInput = {
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  leagueGroupId?: InputMaybe<Scalars['ID']['input']>;
  leagueId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  playerIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssociation?: Maybe<Association>;
  addClub?: Maybe<Club>;
  addGameToMatchDay?: Maybe<Game>;
  addGym?: Maybe<Gym>;
  addLeague?: Maybe<League>;
  addLeagueGroup?: Maybe<LeagueGroup>;
  addMatchDay?: Maybe<MatchDay>;
  addMatchDayTeam?: Maybe<MatchdayTeam>;
  addPerson?: Maybe<Person>;
  addPreferredDateForLeague?: Maybe<PreferredMatchdayDate>;
  addSeason?: Maybe<Season>;
  addTeam?: Maybe<Team>;
  modifyAssociation?: Maybe<Association>;
  modifyClub?: Maybe<Club>;
  modifyGameInMatchDay?: Maybe<Game>;
  modifyGym?: Maybe<Gym>;
  modifyLeague?: Maybe<League>;
  modifyLeagueGroup?: Maybe<LeagueGroup>;
  modifyMatchDay?: Maybe<MatchDay>;
  modifyMatchDayTeam?: Maybe<MatchdayTeam>;
  modifyPerson?: Maybe<Person>;
  modifyPreferredDateForLeague?: Maybe<PreferredMatchdayDate>;
  modifySeason?: Maybe<Season>;
  modifyTeam?: Maybe<Team>;
  registerTeamsForSeason?: Maybe<Array<Maybe<Team>>>;
  removeAssociation?: Maybe<Scalars['Boolean']['output']>;
  removeClub?: Maybe<Scalars['Boolean']['output']>;
  removeGameFromMatchDay?: Maybe<Scalars['Boolean']['output']>;
  removeGym?: Maybe<Scalars['Boolean']['output']>;
  removeLeague?: Maybe<Scalars['Boolean']['output']>;
  removeLeagueGroup?: Maybe<Scalars['Boolean']['output']>;
  removeMatchDay?: Maybe<Scalars['Boolean']['output']>;
  removeMatchDayTeam?: Maybe<Scalars['Boolean']['output']>;
  removePerson?: Maybe<Scalars['Boolean']['output']>;
  removePreferredDateForLeague?: Maybe<Scalars['Boolean']['output']>;
  removeSeason?: Maybe<Scalars['Boolean']['output']>;
  removeTeam?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddAssociationArgs = {
  association: SaveAssociationInput;
};


export type MutationAddClubArgs = {
  club: SaveClubInput;
};


export type MutationAddGameToMatchDayArgs = {
  game: AddGameInput;
  matchDayId: Scalars['ID']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddGymArgs = {
  gym: SaveGymInput;
};


export type MutationAddLeagueArgs = {
  league: SaveLeagueInput;
};


export type MutationAddLeagueGroupArgs = {
  leagueGroup: SaveLeagueGroupInput;
};


export type MutationAddMatchDayArgs = {
  matchDay: SaveMatchDayInput;
};


export type MutationAddMatchDayTeamArgs = {
  matchDayTeam: SaveMatchDayTeamInput;
};


export type MutationAddPersonArgs = {
  person: SavePersonInput;
};


export type MutationAddPreferredDateForLeagueArgs = {
  date: SavePreferredMatchdayDateInput;
};


export type MutationAddSeasonArgs = {
  season: SaveSeasonInput;
};


export type MutationAddTeamArgs = {
  team: SaveTeamInput;
};


export type MutationModifyAssociationArgs = {
  association: ModifyAssociationInput;
};


export type MutationModifyClubArgs = {
  club: ModifyClubInput;
};


export type MutationModifyGameInMatchDayArgs = {
  game: ModifyGameInput;
  matchDayId: Scalars['ID']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};


export type MutationModifyGymArgs = {
  gym: ModifyGymInput;
};


export type MutationModifyLeagueArgs = {
  league: ModifyLeagueInput;
};


export type MutationModifyLeagueGroupArgs = {
  leagueGroup: ModifyLeagueGroupInput;
};


export type MutationModifyMatchDayArgs = {
  matchDay: ModifyMatchDayInput;
};


export type MutationModifyMatchDayTeamArgs = {
  matchDayTeam: ModifyMatchDayTeamInput;
  pin?: InputMaybe<Scalars['String']['input']>;
};


export type MutationModifyPersonArgs = {
  person: ModifyPersonInput;
};


export type MutationModifyPreferredDateForLeagueArgs = {
  date: ModifyPreferredMatchdayDateInput;
};


export type MutationModifySeasonArgs = {
  season: ModifySeasonInput;
};


export type MutationModifyTeamArgs = {
  team: ModifyTeamInput;
};


export type MutationRegisterTeamsForSeasonArgs = {
  registration: RegisterTeamsForSeasonInput;
};


export type MutationRemoveAssociationArgs = {
  associationId: Scalars['ID']['input'];
};


export type MutationRemoveClubArgs = {
  clubId: Scalars['ID']['input'];
};


export type MutationRemoveGameFromMatchDayArgs = {
  gameId: Scalars['ID']['input'];
  matchDayId: Scalars['ID']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveGymArgs = {
  gymId: Scalars['ID']['input'];
};


export type MutationRemoveLeagueArgs = {
  leagueId: Scalars['ID']['input'];
};


export type MutationRemoveLeagueGroupArgs = {
  leagueGroupId: Scalars['ID']['input'];
};


export type MutationRemoveMatchDayArgs = {
  matchDayId: Scalars['ID']['input'];
};


export type MutationRemoveMatchDayTeamArgs = {
  matchDayTeamId: Scalars['ID']['input'];
};


export type MutationRemovePersonArgs = {
  personId: Scalars['ID']['input'];
};


export type MutationRemovePreferredDateForLeagueArgs = {
  clubId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  preferenceDate?: InputMaybe<Scalars['AWSDate']['input']>;
};


export type MutationRemoveSeasonArgs = {
  seasonId: Scalars['ID']['input'];
};


export type MutationRemoveTeamArgs = {
  teamId: Scalars['ID']['input'];
};

export type Person = {
  __typename?: 'Person';
  address?: Maybe<Address>;
  club?: Maybe<Club>;
  dateOfBirth?: Maybe<Scalars['AWSDate']['output']>;
  email?: Maybe<Scalars['AWSEmail']['output']>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  subjectId?: Maybe<Scalars['ID']['output']>;
  uciCode?: Maybe<Scalars['String']['output']>;
};

export type PersonPermission = {
  __typename?: 'PersonPermission';
  permission: Scalars['String']['output'];
  personId: Scalars['ID']['output'];
  resourceId: Scalars['ID']['output'];
  resourceType: Scalars['String']['output'];
};

export enum PreferenceStatus {
  Available = 'AVAILABLE',
  Preferred = 'PREFERRED'
}

export type PreferredMatchdayDate = {
  __typename?: 'PreferredMatchdayDate';
  club: Club;
  league: League;
  notes?: Maybe<Scalars['String']['output']>;
  preferenceDate: Scalars['AWSDate']['output'];
  season: Season;
  status: PreferenceStatus;
};

export type Query = {
  __typename?: 'Query';
  getAllGamesOfTeamInSeason?: Maybe<Array<Maybe<Game>>>;
  getAllMatchdaysOfTeamInSeason?: Maybe<Array<Maybe<MatchDay>>>;
  getAllPlayersOfClubInSeason?: Maybe<Array<Maybe<Person>>>;
  getAllTeamsOfClubInSeason?: Maybe<Array<Maybe<Team>>>;
  getAssociationById?: Maybe<Association>;
  getAuditLogEntriesForActor?: Maybe<Array<Maybe<AuditLogEntry>>>;
  getAuditLogEntriesForResource?: Maybe<Array<Maybe<AuditLogEntry>>>;
  getAvailableDatesForSeason?: Maybe<Array<Maybe<PreferredMatchdayDate>>>;
  getClubById?: Maybe<Club>;
  getGameById?: Maybe<Game>;
  getGymById?: Maybe<Gym>;
  getLeagueById?: Maybe<League>;
  getLeagueGroupById?: Maybe<LeagueGroup>;
  getListOfAssociations?: Maybe<Array<Maybe<Association>>>;
  getListOfClubs?: Maybe<Array<Maybe<Club>>>;
  getListOfClubsByAssociation?: Maybe<Array<Maybe<Club>>>;
  getListOfClubsByLeague?: Maybe<Array<Maybe<Club>>>;
  getListOfClubsByLeagueGroup?: Maybe<Array<Maybe<Club>>>;
  getListOfGroupsInLeague?: Maybe<Array<Maybe<LeagueGroup>>>;
  getListOfGyms?: Maybe<Array<Maybe<Gym>>>;
  getListOfLeagueInSeason?: Maybe<Array<Maybe<League>>>;
  getListOfMatchdays?: Maybe<Array<Maybe<MatchDay>>>;
  getListOfMatchdaysInSeason?: Maybe<Array<Maybe<MatchDay>>>;
  getListOfPeople?: Maybe<Array<Maybe<Person>>>;
  getListOfSeasons?: Maybe<Array<Maybe<Season>>>;
  getListOfTeamsForLeague?: Maybe<Array<Maybe<Team>>>;
  getListOfTeamsForLeagueGroup?: Maybe<Array<Maybe<Team>>>;
  getMatchdayById?: Maybe<MatchDay>;
  getPersonById?: Maybe<Person>;
  getPersonByUciCode?: Maybe<Person>;
  getPersonPermissions?: Maybe<Array<Maybe<PersonPermission>>>;
  getPreferredDatesForClub?: Maybe<Array<Maybe<PreferredMatchdayDate>>>;
  getSeasonById?: Maybe<Season>;
  getTeamById?: Maybe<Team>;
};


export type QueryGetAllGamesOfTeamInSeasonArgs = {
  seasonId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


export type QueryGetAllMatchdaysOfTeamInSeasonArgs = {
  seasonId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


export type QueryGetAllPlayersOfClubInSeasonArgs = {
  clubId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
};


export type QueryGetAllTeamsOfClubInSeasonArgs = {
  clubId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
};


export type QueryGetAssociationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAuditLogEntriesForActorArgs = {
  actorId: Scalars['ID']['input'];
  endDate?: InputMaybe<Scalars['AWSDateTime']['input']>;
  startDate?: InputMaybe<Scalars['AWSDateTime']['input']>;
};


export type QueryGetAuditLogEntriesForResourceArgs = {
  endDate?: InputMaybe<Scalars['AWSDateTime']['input']>;
  resourceId: Scalars['ID']['input'];
  resourceType: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['AWSDateTime']['input']>;
};


export type QueryGetAvailableDatesForSeasonArgs = {
  leagueId?: InputMaybe<Scalars['ID']['input']>;
  seasonId: Scalars['ID']['input'];
};


export type QueryGetClubByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGameByIdArgs = {
  gameId: Scalars['ID']['input'];
  matchDayId: Scalars['ID']['input'];
};


export type QueryGetGymByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLeagueByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLeagueGroupByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetListOfClubsByAssociationArgs = {
  associationId: Scalars['ID']['input'];
};


export type QueryGetListOfClubsByLeagueArgs = {
  leagueId: Scalars['ID']['input'];
};


export type QueryGetListOfClubsByLeagueGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGetListOfGroupsInLeagueArgs = {
  leagueId: Scalars['ID']['input'];
};


export type QueryGetListOfGymsArgs = {
  clubId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetListOfLeagueInSeasonArgs = {
  seasonId: Scalars['ID']['input'];
};


export type QueryGetListOfMatchdaysArgs = {
  associationId?: InputMaybe<Scalars['ID']['input']>;
  groupId?: InputMaybe<Scalars['ID']['input']>;
  leagueId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetListOfMatchdaysInSeasonArgs = {
  seasonId: Scalars['ID']['input'];
};


export type QueryGetListOfPeopleArgs = {
  clubId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetListOfSeasonsArgs = {
  associationId: Scalars['ID']['input'];
};


export type QueryGetListOfTeamsForLeagueArgs = {
  leagueId: Scalars['ID']['input'];
};


export type QueryGetListOfTeamsForLeagueGroupArgs = {
  groupId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
};


export type QueryGetMatchdayByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPersonByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPersonByUciCodeArgs = {
  uciCode: Scalars['String']['input'];
};


export type QueryGetPersonPermissionsArgs = {
  personId: Scalars['ID']['input'];
};


export type QueryGetPreferredDatesForClubArgs = {
  clubId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
};


export type QueryGetSeasonByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTeamByIdArgs = {
  id: Scalars['ID']['input'];
};

export type RefereeInfo = {
  __typename?: 'RefereeInfo';
  additionalReferees: Array<Maybe<Person>>;
  chiefReferee?: Maybe<Person>;
};

export type RefereeInfoInput = {
  additionalRefereeIds: Array<InputMaybe<Scalars['ID']['input']>>;
  chiefRefereeId?: InputMaybe<Scalars['ID']['input']>;
};

export type RegisterTeamInput = {
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  playerIds: Array<Scalars['ID']['input']>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegisterTeamsForSeasonInput = {
  clubId: Scalars['ID']['input'];
  preferredDates?: InputMaybe<Array<InputMaybe<SavePreferredMatchdayDateInput>>>;
  seasonId: Scalars['ID']['input'];
  teams: Array<RegisterTeamInput>;
};

export type SaveAssociationInput = {
  address: AddressInput;
  contactEmail: Scalars['AWSEmail']['input'];
  contactName: Scalars['String']['input'];
  coordinators: Array<InputMaybe<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  shortName: Scalars['String']['input'];
  website?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type SaveClubInput = {
  address: AddressInput;
  associationId: Scalars['ID']['input'];
  contactId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type SaveGymInput = {
  address: AddressInput;
  availableFields: Scalars['String']['input'];
  clubId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type SaveLeagueGroupInput = {
  groupLeaderId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  number: Scalars['Int']['input'];
  regulation: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type SaveLeagueInput = {
  additionalEligibleAssociations: Array<InputMaybe<Scalars['ID']['input']>>;
  description: Scalars['String']['input'];
  matchdayDates?: InputMaybe<Array<Scalars['AWSDate']['input']>>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  seasonId: Scalars['ID']['input'];
  shortName?: InputMaybe<Scalars['String']['input']>;
};

export type SaveMatchDayInput = {
  commissioners?: InputMaybe<RefereeInfoInput>;
  endDate: Scalars['AWSDateTime']['input'];
  groupId: Scalars['ID']['input'];
  gymId: Scalars['ID']['input'];
  matchDayNumber: Scalars['String']['input'];
  report?: InputMaybe<Scalars['String']['input']>;
  secretary: Scalars['String']['input'];
  startDate: Scalars['AWSDateTime']['input'];
  streamingLink?: InputMaybe<Scalars['AWSURL']['input']>;
  teamIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type SaveMatchDayTeamInput = {
  present: Scalars['Boolean']['input'];
  substitutePlayerId?: InputMaybe<Scalars['ID']['input']>;
  teamId: Scalars['ID']['input'];
};

export type SavePersonInput = {
  address?: InputMaybe<AddressInput>;
  clubId: Scalars['ID']['input'];
  dateOfBirth?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  uciCode?: InputMaybe<Scalars['String']['input']>;
};

export type SavePreferredMatchdayDateInput = {
  clubId: Scalars['ID']['input'];
  leagueId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  preferenceDate: Scalars['AWSDate']['input'];
  status: PreferenceStatus;
};

export type SaveSeasonInput = {
  associationId: Scalars['ID']['input'];
  endDate: Scalars['AWSDate']['input'];
  name: Scalars['String']['input'];
  registrationEnd: Scalars['AWSDate']['input'];
  registrationStart?: InputMaybe<Scalars['AWSDate']['input']>;
  startDate: Scalars['AWSDate']['input'];
};

export type SaveTeamInput = {
  clubId: Scalars['ID']['input'];
  exemptionRequest?: InputMaybe<Scalars['String']['input']>;
  leagueGroupId?: InputMaybe<Scalars['ID']['input']>;
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  playerIds: Array<InputMaybe<Scalars['ID']['input']>>;
  secondRightToPlay?: InputMaybe<Scalars['Boolean']['input']>;
  sgClubId?: InputMaybe<Scalars['ID']['input']>;
  withoutCompetition?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Season = {
  __typename?: 'Season';
  association: Association;
  endDate: Scalars['AWSDate']['output'];
  id: Scalars['ID']['output'];
  leagues?: Maybe<Array<Maybe<League>>>;
  name: Scalars['String']['output'];
  registrationEnd: Scalars['AWSDate']['output'];
  registrationStart?: Maybe<Scalars['AWSDate']['output']>;
  startDate: Scalars['AWSDate']['output'];
};

export type Team = {
  __typename?: 'Team';
  club: Club;
  exemptionRequest?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  league: League;
  leagueGroup?: Maybe<LeagueGroup>;
  name: Scalars['String']['output'];
  players: Array<Maybe<Person>>;
  secondRightToPlay?: Maybe<Scalars['Boolean']['output']>;
  sgClub?: Maybe<Club>;
  withoutCompetition?: Maybe<Scalars['Boolean']['output']>;
};
