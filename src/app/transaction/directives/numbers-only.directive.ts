import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {
    constructor(el: ElementRef) {
        const input = el.nativeElement as HTMLInputElement;
        input.setAttribute('pattern', '[0-9]*');
        input.setAttribute('inputmode', 'numeric');
    }
}