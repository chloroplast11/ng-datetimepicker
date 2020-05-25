import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToTarget]'
})
export class ScrollToTargetDirective {

	constructor(private _el: ElementRef) { }

	set scrollTop(value: number) { 
		this._el.nativeElement.scrollTop = value;
	}

	get scrollTop(): number{
		return this._el.nativeElement.scrollTop;
	}

	get offsetTop(): number{
		return this._el.nativeElement.offsetTop;
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