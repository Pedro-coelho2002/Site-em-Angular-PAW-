export class User {
  _id: Number;
  name: String;
  address: String;
  password: String;
  contact: Number;
  email: String;
  cargo: String;
  nif: Number;
  points: number;
  updated_at: Date;

  constructor(
    _id: Number,
    name: String,
    address: String,
    password: String,
    contact: Number,
    email: String,
    cargo: String,
    nif: Number,
    points: number,
    updated_at: Date
  ) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.password = password;
    this.contact = contact;
    this.email = email;
    this.cargo = cargo;
    this.nif = nif;
    this.points = points;
    this.updated_at = updated_at;
  }
}
