import { AngularFireList, ChildEvent } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { IndexedList } from "./indexed-objets.type";

export interface ExtendedFireList<T> extends AngularFireList<T> {
    indexedValueChanges: (events?: ChildEvent[]) => Observable<IndexedList<T>>;
}