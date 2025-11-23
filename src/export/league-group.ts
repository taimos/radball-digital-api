export interface Address {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export interface Club {
  id: string;
  name: string;
  shortName: string;
  preferredDates: PreferredMatchdayDate[];
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface League {
  id: string;
  name: string;
  shortName: string;
  description: string;
  minAge: number | null;
  maxAge: number | null;
  matchdayDates: string[];
}

export interface Leader {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface Group {
  id: string;
  number: number;
  name: string;
  shortName: string;
  season: Season;
  league: League;
  leader: Leader;
  regulation: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  gender: string;
  dateOfBirth: string;
  uciCode: string;
  nationality: string;
  clubId: string;
}

export type PreferredDateStatus = 'PREFERRED' | 'AVAILABLE';

export interface PreferredMatchdayDate {
  preferenceDate: string;
  status: PreferredDateStatus;
  notes: string | null;
  gymId: string | null;
}

export interface TeamDetail {
  id: string;
  name: string;
  withoutCompetition: boolean;
  secondRightToPlay: boolean;
  exemptionRequest: string | null;
  players: Person[];
  clubId: string;
  sgClubId: string | null;
}

export interface Gym {
  id: string;
  name: string;
  availableFields: string;
  address: Address;
  clubId: string;
}

export interface LeagueGroupStatistics {
  totalTeams: number;
  totalPlayers: number;
  totalClubs: number;
  totalGyms: number;
}

export interface LeagueGroupExport {
  group: Group;
  teams: TeamDetail[];
  clubs: Club[];
  gyms: Gym[];
  statistics: LeagueGroupStatistics;
}
