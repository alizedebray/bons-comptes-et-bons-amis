import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Transaction } from 'src/app/common/models/transaction.interface';

@Component({
  templateUrl: './balance-overview.component.html',
  styleUrls: ['./balance-overview.component.sass']
})
export class BalanceOverviewComponent implements OnDestroy {
  balance$: Observable<object>;
  private destroy$ = new Subject<void>();

  constructor(db: AngularFireDatabase) {
    this.balance$ = db.list<Transaction>('transactions')
      .valueChanges()
      .pipe(
        map((transactions) =>
          transactions.reduce((breakdown, transaction) => {
            const transactionBalance = transaction.amount / transaction.paidFor.length;
            breakdown[transaction.paidBy] = (breakdown[transaction.paidBy] || 0) + transactionBalance;
            transaction.paidFor.filter(user => user !== transaction.paidBy).forEach(user => {
              breakdown[user] = (breakdown[user] || 0) - transactionBalance; 
            });
            return breakdown;
          }, {})
        ),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
