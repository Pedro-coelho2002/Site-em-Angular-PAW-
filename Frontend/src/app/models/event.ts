export class Event {
  _id: string;
  name: string;
  description: string;
  local_id: string;
  startDateTime: Date;
  endDateTime: Date;
  priceInfantil: number;
  priceJuvenil: number;
  priceAdulto: number;
  priceSenior: number;
  countInfantil: number;
  countJuvenil: number;
  countAdulto: number;
  countSenior: number;
  maxTickets: number;
  image: string;
  updated_at: Date;

  constructor(
    _id: string,
    name: string,
    description: string,
    local_id: string,
    startDateTime: Date,
    endDateTime: Date,
    priceInfantil: number,
    priceJuvenil: number,
    priceAdulto: number,
    priceSenior: number,
    countInfantil: number,
    countJuvenil: number,
    countAdulto: number,
    countSenior: number,
    maxTickets: number,
    image: string,
    updated_at: Date
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.local_id = local_id;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.priceInfantil = priceInfantil;
    this.priceJuvenil = priceJuvenil;
    this.priceAdulto = priceAdulto;
    this.priceSenior = priceSenior;
    this.countInfantil = countInfantil;
    this.countJuvenil = countJuvenil;
    this.countAdulto = countAdulto;
    this.countSenior = countSenior;
    this.maxTickets = maxTickets;
    this.image = image;
    this.updated_at = updated_at;
  }
}
