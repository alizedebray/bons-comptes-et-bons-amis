import { Component } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { MatDialog } from "@angular/material/dialog";
import { filter, map, Observable } from "rxjs";
import { DeletionConfirmationComponent } from "../../components/deletion-confirmation/deletion-confirmation.component";
import { Transaction } from "../../models/transaction.interface";

@Component({
    templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {
    transactionsRef: AngularFireList<Transaction>;
    transactions$: Observable<Transaction[]>;

    constructor(db: AngularFireDatabase, public dialog: MatDialog) {
        this.transactionsRef = db.list<Transaction>('transactions', ref => ref.orderByChild('date'));
        this.transactions$ = this.transactionsRef.snapshotChanges().pipe(
            map(changes => changes.reverse().map(c => ({ key: c.payload.key, ...c.payload.val() } as Transaction)))
        );
    }

    confirmDeletion(transaction: Transaction): void {
        const dialogRef = this.dialog.open(DeletionConfirmationComponent);
    
        dialogRef.afterClosed()
            .pipe(filter(shouldDeleted => shouldDeleted))
            .subscribe(() => this.transactionsRef.remove(transaction.key));
    }
}