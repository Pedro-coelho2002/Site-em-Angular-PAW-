export class Local {
  _id: string;
  name: string;
  lat: number;
  lon: number;
  street: string;
  county: string;
  postcode: string;
  updated_at: Date;

  constructor(
    _id: string,
    name: string,
    lat: number,
    lon: number,
    street: string,
    county: string,
    postcode: string,
    updated_at: Date
  ) {
    this._id = _id;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.street = street;
    this.county = county;
    this.postcode = postcode;
    this.updated_at = updated_at;
  }
}
