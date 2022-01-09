import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

import { TransactionModule } from './transaction/transaction.module';
import { BalanceModule } from './balance/balance.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { registerLocaleData } from '@angular/common';
import localeFrCh from '@angular/common/locales/fr-CH';
registerLocaleData(localeFrCh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TransactionModule,
    BalanceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-CH'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'CHF'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
