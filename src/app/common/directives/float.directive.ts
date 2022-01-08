import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[float]'
})
export class FloatDirective {
  @HostListener('keypress', ['$event']) onKeypress({key}: KeyboardEvent) {
    return /\d|\./.test(key);
  }

  constructor(el: ElementRef) {
    const input = el.nativeElement as HTMLInputElement;
    input.setAttribute('pattern', '[0-9.]*');
    input.setAttribute('inputmode', 'decimal');
  }
}
