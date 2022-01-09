import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { RouterModule, Routes } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{
  path: 'decompte',
  component: BalanceOverviewComponent
}];

@NgModule({
  declarations: [
    BalanceOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatIconModule
  ]
})
export class BalanceModule { }
