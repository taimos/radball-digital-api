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

export interface Association {
  id: string;
  name: string;
  shortName: string;
}

export interface Competition {
  id: string;
  name: string;
  shortName: string;
  description: string | null;
  association: Association;
  startDate: string;
  endDate: string;
  registrationStart: string;
  registrationEnd: string;
  registrationPermission: RegistrationPermission;
  minAge: number | null;
  maxAge: number | null;
  coordinators: Coordinator[];
  regulationFileUrl: string | null;
}

export type RegistrationPermission = 'ALL_CLUBS' | 'ASSOCIATIONS_ONLY' | 'INVITE_ONLY';

export interface Coordinator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface Leader {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface CompetitionGroupDetail {
  id: string;
  number: number;
  name: string;
  shortName: string;
  competition: Competition;
  leader: Leader | null;
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

export interface CompetitionGroupStatistics {
  totalTeams: number;
  totalPlayers: number;
  totalClubs: number;
  totalGyms: number;
}

export interface CompetitionGroupExport {
  group: CompetitionGroupDetail;
  teams: TeamDetail[];
  clubs: Club[];
  gyms: Gym[];
  statistics: CompetitionGroupStatistics;
}
