import { prop } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
import { User } from './user.interface';

export class Transaction {
  @prop()
  group: string;

  @prop()
  category: string;

  @prop()
  description: string;

  @prop()
  amount: number;

  @prop()
  currency: string;

  @prop()
  exchangeRate: number;

  @prop()
  timestamp: number;

  @prop()
  paidBy: string;

  @prop()
  paidFor: string[];

  @prop()
  meansOfPayment: string;

  constructor(users: User[]) {
    this.exchangeRate = 1;
    this.currency = 'CHF';
    this.timestamp = moment().startOf('day').valueOf();

    this.paidBy = users[0].name;
    this.meansOfPayment = users[0].meansOfPayment[0];
    this.paidFor = users.map((user) => user.name);
  }
}
