import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/common.module';
import { TransactionListComponent } from './containers/transaction-list/transaction-list.component';
import { NewTransactionComponent } from './containers/new-transaction/new-transaction.component';
import { DeletionConfirmationComponent } from './components/deletion-confirmation/deletion-confirmation.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: TransactionListComponent },
    { path: 'new', component: NewTransactionComponent },
    { path: 'new/:transactionKey', component: NewTransactionComponent }
  ]
}];

@NgModule({
  declarations: [
    TransactionListComponent,
    NewTransactionComponent,
    DeletionConfirmationComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class TransactionModule { }
