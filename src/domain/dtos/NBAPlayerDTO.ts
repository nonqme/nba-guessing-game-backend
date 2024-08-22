export class NBAPlayerDTO {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public age: number,
    public country: string,
    public height: string,
    public weight: string,
    public portrait: string,
    public teamName: string,
    public position: string,
    public jersey: string,
    public draftYear: string,
    public draftRound: string,
    public draftNumber: string,
    public pointsPerGame: number,
    public assistsPerGame: number,
    public reboundsPerGame: number
  ) {}
}
