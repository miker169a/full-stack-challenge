export interface Ticket {
  id?: string;
  eventId?: string;
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: "available" | "sold out";
}

export interface Event {
  id?: string;
  name: string;
  date: string;
  description: string;
  tickets: Ticket[];
}
