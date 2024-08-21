import type { NBAPosition } from '../types';

export class NBAPlayerDTO {
  #id: number;

  #firstName: string;
  #lastName: string;
  #age: number;
  #height: string;
  #weight: number;
  #country: string;

  #team: string;
  #position: NBAPosition[];
  #number: number;

  #draftYear: number;
  #draftRound: number;
  #draftNumber: number;

  #pointPerGame: number;
  #reboundsPerGame: number;
  #assistsPerGame: number;

  constructor(
    id: number,

    firstName: string,
    lastName: string,
    age: number,
    height: string,
    weight: number,
    country: string,

    team: string,
    position: NBAPosition[],
    number: number,

    draftYear: number,
    draftRound: number,
    draftNumber: number,

    pointPerGame: number,
    reboundsPerGame: number,
    assistsPerGame: number
  ) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
    this.#height = height;
    this.#weight = weight;
    this.#country = country;
    this.#team = team;
    this.#position = position;
    this.#number = number;
    this.#draftYear = draftYear;
    this.#draftRound = draftRound;
    this.#draftNumber = draftNumber;
    this.#pointPerGame = pointPerGame;
    this.#reboundsPerGame = reboundsPerGame;
    this.#assistsPerGame = assistsPerGame;
  }
  get id(): number {
    return this.#id;
  }

  get firstName(): string {
    return this.#firstName;
  }

  get lastName(): string {
    return this.#lastName;
  }

  get age(): number {
    return this.#age;
  }

  get height(): string {
    return this.#height;
  }

  get weight(): number {
    return this.#weight;
  }

  get country(): string {
    return this.#country;
  }

  get team(): string {
    return this.#team;
  }

  get position(): NBAPosition[] {
    return this.#position;
  }

  get number(): number {
    return this.#number;
  }

  get draftYear(): number {
    return this.#draftYear;
  }

  get draftRound(): number {
    return this.#draftRound;
  }

  get draftNumber(): number {
    return this.#draftNumber;
  }

  get pointPerGame(): number {
    return this.#pointPerGame;
  }

  get reboundsPerGame(): number {
    return this.#reboundsPerGame;
  }

  get assistsPerGame(): number {
    return this.#assistsPerGame;
  }
}
