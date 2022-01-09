import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter, map, Observable } from "rxjs";
import { ExtendedFireList } from "src/app/common/models/extended-fire-list.interface";
import { IndexedValue } from "src/app/common/models/indexed-objets.type";
import { ExtendedFireDatabase } from "src/app/common/service/extended-fire-database.service";
import { DeletionConfirmationComponent } from "../../components/deletion-confirmation/deletion-confirmation.component";
import { Transaction } from "../../models/transaction.interface";

@Component({
    templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent {
    transactionsRef: ExtendedFireList<Transaction>;
    transactions$: Observable<IndexedValue<Transaction>[]>;

    constructor(db: ExtendedFireDatabase, public dialog: MatDialog) {
        this.transactionsRef = db.list<Transaction>('transactions', ref => ref.orderByChild('timestamp'));
        this.transactions$ = this.transactionsRef.indexedValueChanges().pipe(map(changes => changes.reverse()));
    }

    confirmDeletion(transaction: IndexedValue<Transaction>): void {
        const dialogRef = this.dialog.open(DeletionConfirmationComponent);
    
        dialogRef.afterClosed()
            .pipe(filter(shouldDeleted => shouldDeleted))
            .subscribe(() => this.transactionsRef.remove(transaction.key));
    }
}