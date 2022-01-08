import * as moment from 'moment';
import { User } from './user.interface';

export class Transaction {
    group: string;
    category: string;
    amount: number;
    description: string;
    date: number;
    paidBy: string;
    paidFor: string[];
    meansOfPayment: string;

    constructor(users: User[]) {
        this.date = moment().startOf('day').valueOf();

        this.paidBy = users[0].name;
        this.meansOfPayment = users[0].meansOfPayment[0];
        this.paidFor = users.map(user => user.name);
    }
}