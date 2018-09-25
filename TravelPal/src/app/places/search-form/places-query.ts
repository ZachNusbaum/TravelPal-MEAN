export class PlacesQuery {
  constructor(
    public address: string,
    public type: string = 'point_of_interest'
  ) {}
}
