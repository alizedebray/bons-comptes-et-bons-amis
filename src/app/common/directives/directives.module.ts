import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatDirective } from './float.directive';



@NgModule({
  declarations: [
    FloatDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FloatDirective
  ]
})
export class CommonDirectivesModule { }
