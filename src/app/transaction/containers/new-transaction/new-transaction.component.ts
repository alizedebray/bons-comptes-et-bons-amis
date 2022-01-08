import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Category } from '../../models/category.interface';
import { Group } from '../../models/group.interface';
import { User } from '../../models/user.interface';
import { Transaction } from '../../models/transaction.interface';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html'
})
export class NewTransactionComponent implements OnDestroy {
  users$: Observable<User[]>;

  transactionKey$: Observable<string>;
  transaction$: Observable<Transaction>;

  groups$: Observable<Group[]>;
  categories$: Observable<Category[]>;
  date$: Observable<Date>;
  meansOfPayment$: Observable<string[]>;

  selectedGroup$ = new Subject<string>();
  selectedPaidBy$ = new Subject<string>();

  readonly parseFloat = parseFloat;
  private readonly destroy$ = new Subject<void>();

  constructor(route: ActivatedRoute,
              private router: Router,
              private db: AngularFireDatabase) {
    // get all users 
    this.users$ = db.list<User>('users').valueChanges();

    // get the transaction key from the URL
    this.transactionKey$ = route.paramMap.pipe(map(params => params.get('transactionKey')));

    // if there is a transaction key get the corresponding transaction otherwise get a new transaction
    this.transaction$ = this.transactionKey$.pipe(
      switchMap(transactionKey => {
        if (transactionKey) {
          return db.object<Transaction>('transactions/' + transactionKey).valueChanges();
        } else {
          return this.users$.pipe(map(users => new Transaction(users)));
        }
      })
    );

    // get all the group 
    this.groups$ = db.list<Group>('groups').valueChanges().pipe(takeUntil(this.destroy$));

    // get the categories depending on the currently selected group
    this.categories$ = this.selectedGroup$.pipe(
      switchMap(groupName => this.groups$.pipe(map(groups => groups.find(({name}) => name === groupName)))),
      map(group => group?.categories)
    );

    // get the date in correct format
    this.date$ = this.transaction$.pipe(map(transaction => new Date(transaction.date)));

    // get the means of payment depending on the currently selected purchaser
    this.meansOfPayment$ = this.selectedPaidBy$.pipe(
      switchMap(paidBy => this.users$.pipe(map(users => users.find(({name}) => name === paidBy)))),
      map(user => user?.meansOfPayment)
    );

    // initiate the observers with the value coming from the transaction 
    this.transaction$.pipe(take(1)).subscribe(transaction => setTimeout(() => {
      this.selectedGroup$.next(transaction.group);
      this.selectedPaidBy$.next(transaction.paidBy);
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save(f: NgForm): void {
    // save the transaction as a new transaction if there is no transaction key, replace existing one otherwise
    this.transactionKey$.pipe(
      switchMap(transactionKey => {
        if (transactionKey) {
          return this.db.object<Transaction>('transactions/' + transactionKey).set(f.value);
        } else {
          return this.db.list('transactions').push(f.value);
        }
      })
    ).subscribe(() => this.router.navigate(['']));
  }

}
