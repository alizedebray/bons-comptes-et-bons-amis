import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category.interface';
import { Group } from '../../models/group.interface';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.sass']
})
export class NewTransactionComponent implements OnDestroy {
  readonly destroy$ = new Subject();
  today: Date = new Date();
  users: User[] = [];
  currentUser: User|null = null;
  everyone: string[] = [];
  groups: Group[] = [];
  categories: Category[] = [];
  meansOfPayment: string[] = [];

  constructor(private db: AngularFireDatabase,
              private router: Router) {
    const groups$ = db.list('groups').valueChanges() as Observable<Group[]>;
    groups$.pipe(takeUntil(this.destroy$)).subscribe(groups => this.groups = groups);

    const users$ = db.list('users').valueChanges() as Observable<User[]>;
    users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      this.everyone = users.map(({name}) => name);
      this.currentUser = users[0];
      this.setMeansOfPayment(users[0].name);
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  setCategories(selectedGroupName: string): void {
    const selectedGroup = this.groups.find(({name}) => name === selectedGroupName);
    this.categories = selectedGroup?.categories || [];
  }

  setMeansOfPayment(selectedUserName: string): void {
    const selectedUser = this.users.find(({name}) => name === selectedUserName);
    this.meansOfPayment = selectedUser?.meansOfPayment || [];
  }

  save(f: NgForm): void {
    if(f.valid) {
      this.db.list('transactions').push(f.value).then(() => this.router.navigate(['']));
    }
  }

}