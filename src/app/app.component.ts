import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  links = [
    {label: 'Transactions', path: 'transactions'},
    {label: 'Décompte', path: 'decompte'},
  ];
}
