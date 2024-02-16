export class Ticket {
  constructor(
    public userId: Number,
    public eventId: string,
    public userNIF: Number,
    public eventName: string,
    public ticketType: string,
    public promo: number,
    public quantity: number,
    public price: number
  ) {}
}
