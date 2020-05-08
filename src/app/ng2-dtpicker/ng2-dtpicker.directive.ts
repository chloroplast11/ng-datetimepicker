import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToTarget]'
})
export class ScrollToTargetDirective {

	constructor(private _el: ElementRef) { }

	set scrollTop(value: number) { 
		this._el.nativeElement.scrollTop = value;
	}

}


@Directive({ 
	selector: '[appOffsetTop]'
})
export class OffsetTopDirective {

	constructor(private _el: ElementRef) { }

	get offsetTop(): number { 
		return this._el.nativeElement.offsetTop; 
	}

}