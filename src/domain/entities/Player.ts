export type PlayerPosition = 'guard' | 'forward' | 'center';
export type PlayerData = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  birthDate: number;
  height: string;
  team: string;
  positions: PlayerPosition[];
};

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  birthDate: number;
  height: string;
  team: string;
  positions: PlayerPosition[];

  constructor({ id, firstName, lastName, country, birthDate, height, team, positions }: PlayerData) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.birthDate = birthDate;
    this.height = height;
    this.team = team;
    this.positions = positions;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get age() {
    return new Date().getFullYear() - new Date(this.birthDate).getFullYear();
  }
}
