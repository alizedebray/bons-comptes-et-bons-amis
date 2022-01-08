import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, ChildEvent, PathReference, QueryFn, SnapshotAction } from '@angular/fire/compat/database';
import { map, Observable, of } from 'rxjs';
import { ExtendedFireList } from '../models/extended-fire-list.interface';
import { IndexedList, IndexedValue } from '../models/indexed-objets.type';

class CustomFireList<T> {
  snapshotChanges: (events?: ChildEvent[]) => Observable<SnapshotAction<T>[]> = () => of([]);

  constructor(fireList: AngularFireList<T>) {
      Object.assign(this, fireList)
  }

  indexedValueChanges(events?: ChildEvent[]): Observable<IndexedList<T>> {
      return this.snapshotChanges(events).pipe(
          map(changes => changes.reverse().map(c => ({ key: c.payload.key, ...c.payload.val() } as IndexedValue<T>)))
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExtendedFireDatabase {

  constructor(private db: AngularFireDatabase) { }

  list<T>(pathOrRef: PathReference, queryFn?: QueryFn): ExtendedFireList<T> {
    return new CustomFireList(this.db.list<T>(pathOrRef, queryFn)) as ExtendedFireList<T>;
  }
}
