import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { Category } from '../../models/category.interface';
import { Group } from '../../models/group.interface';
import { User } from '../../models/user.interface';
import { Transaction } from '../../models/transaction.interface';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
})
export class NewTransactionComponent implements OnInit {
  users$: Observable<User[]>;
  groups$: Observable<Group[]>;
  transactionKey$: Observable<string>;

  transactionForm: FormGroup;

  categories$: Observable<Category[]>;
  meansOfPayment$: Observable<string[]>;

  get amountControl(): FormControl {
    return this.transactionForm.get('amount') as FormControl;
  }

  get dateControl(): FormControl {
    return this.transactionForm.get('date') as FormControl;
  }

  get paidForControl(): FormControl {
    return this.transactionForm.get('paidFor') as FormControl;
  }

  private _amount: string;

  public get amount(): string {
    return this._amount;
  }

  public set amount(amount: string) {
    this._amount = amount;
    this.amountControl.setValue(parseFloat(amount));
  }

  private _date: Date;

  public get date(): Date {
    return this._date;
  }

  public set date(date: Date) {
    this._date = date;
    this.dateControl.setValue(date.getTime());
  }

  constructor(
    route: ActivatedRoute,
    fb: RxFormBuilder,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.groups$ = db.list<Group>('groups').valueChanges();

    this.users$ = db.list<User>('users').valueChanges();
    this.users$.pipe(take(1)).subscribe((users) => {
      this.transactionForm = fb.formGroup(new Transaction(users));

      this.date = new Date(this.dateControl.value);

      this.categories$ = this.transactionForm.get('group').valueChanges.pipe(
        switchMap((groupName) =>
          this.groups$.pipe(
            map((groups) => groups.find((group) => group.name === groupName))
          )
        ),
        map((group) => group.categories)
      );

      this.meansOfPayment$ = this.transactionForm
        .get('paidBy')
        .valueChanges.pipe(
          startWith(this.transactionForm.get('paidBy').value as string),
          switchMap((payerName) =>
            this.users$.pipe(
              map((users) => users.find((user) => user.name === payerName))
            )
          ),
          map((user) => user.meansOfPayment),
          tap((meansOfPayment) =>
            this.transactionForm
              .get('meansOfPayment')
              .setValue(meansOfPayment[0])
          )
        );
    });

    this.transactionKey$ = route.paramMap.pipe(
      map((params) => params.get('transactionKey'))
    );
  }

  ngOnInit(): void {
    this.transactionKey$
      .pipe(
        filter((key) => !!key),
        switchMap((key) =>
          this.db.object<Transaction>('transactions/' + key).valueChanges()
        ),
        take(1)
      )
      .subscribe((transaction) => {
        this.transactionForm.patchValue(transaction);
        this.amount = String(this.amountControl.value);
        this.date = new Date(this.dateControl.value);
      });
  }

  save(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    this.transactionKey$
      .pipe(
        switchMap((transactionKey) => {
          if (transactionKey) {
            return this.db
              .object<Transaction>('transactions/' + transactionKey)
              .set(this.transactionForm.value);
          } else {
            return this.db
              .list('transactions')
              .push(this.transactionForm.value);
          }
        })
      )
      .subscribe(() => this.router.navigate(['']));
  }
}
