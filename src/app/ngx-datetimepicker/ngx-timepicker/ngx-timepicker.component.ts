import {
	Component, 
	OnInit, 
	forwardRef, 
	ViewChildren, 
	ViewChild, 
	QueryList,
	ChangeDetectorRef,
	HostListener,
	ElementRef,
	Output,
	EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ScrollToTargetDirective, OffsetTopDirective} from '../ngx-datetimepicker.directive';

@Component({
	selector: 'ngx-timepicker',
	templateUrl: './ngx-timepicker.component.html',
	styleUrls: ['../ngx-datetimepicker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgxTimepickerComponent),
			multi: true,
		},
	],
})
export class NgxTimepickerComponent implements OnInit, ControlValueAccessor {

	@ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;
	@ViewChild(ScrollToTargetDirective) list: ScrollToTargetDirective;

	@HostListener('document:click', ['$event'])
	offClick(event) {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.close();
		}
	}

	// output events
    @Output('blur') blurEvent = new EventEmitter();
    @Output('focus') focusEvent = new EventEmitter();
    @Output('change') changeEvent = new EventEmitter();


	value: string = '';
	hours = [];
	isTimeBoxOpen: boolean = false;

	private _onChange = (_: any) => {};

	constructor(private changeDetector : ChangeDetectorRef,
				private eRef: ElementRef) {
		
	}

	ngOnInit(): void {}

	registerOnChange(fn: any): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: any): void {}

	writeValue(value: any): void {
		this.value = value;
	}

	onFocus(): void {
		this.open();
	}

	onBlur(): void {}

	handleClickNextHour(): void{
		this.list.scrollTop = this.list.scrollTop + 26;
	}

	handleClickPrevHour(): void{
		this.list.scrollTop = this.list.scrollTop - 26;
	}

	handleClickHour(hour: string):void{
    	this.value = hour;
    	this._updateNgModel();
    	this.close();
    }

	public open(): void{
		this._initTime();
		this.isTimeBoxOpen = true;
		this.changeDetector.detectChanges();
		const activeHour = parseInt(this.value.substring(0, 2));
    	this.list.scrollTop = this.listItems.find((_, i) => {return i === activeHour}).offsetTop - this.list.offsetTop;
	}

	public close(): void{
    	this.isTimeBoxOpen = false;
    }

    private _updateNgModel():void {
		const model:string = this.value;
    	this.changeEvent.emit({value: model});
    	this._onChange(model);

	}

	private _initTime(): void {
		const now = new Date();
		const patt = /^[0-2]?[0-9]\:[0-9]{2}$/;
		let activeHour: number = now.getHours();
		if(patt.test(this.value)){
			activeHour = parseInt(this.value.substring(0, 2));
		}else{
			this.value = ('00' + now.getHours()).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2);
		}

		this.hours = Array.from({ length: 24 }, (v, index) => {
			return {
				hour: ('00' + index).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2),
				isActive: index == activeHour
			}
		});
	}
}
