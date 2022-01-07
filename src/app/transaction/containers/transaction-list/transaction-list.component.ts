import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { Transaction } from "../../models/transaction.interface";

@Component({
    templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {
    transactions$: Observable<Transaction[]>;

    constructor(db: AngularFireDatabase) {
        this.transactions$ = db.list('transactions').valueChanges() as Observable<Transaction[]>;
    }
}