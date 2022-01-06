import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionListComponent } from './containers/transaction-list/transaction-list.component';
import { NewTransactionComponent } from './containers/new-transaction/new-transaction.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: TransactionListComponent},
    {path: 'new', component: NewTransactionComponent}
  ]
}];

@NgModule({
  declarations: [
    TransactionListComponent,
    NewTransactionComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class TransactionModule { }
