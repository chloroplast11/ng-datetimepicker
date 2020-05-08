import {
	Component, 
	OnInit,
	ViewChild, 
	ViewChildren, 
	ElementRef, 
	forwardRef, 
	QueryList, 
	ChangeDetectorRef,
	HostListener,
	Output,
	EventEmitter
} from '@angular/core';

import { LangType, i18n } from './i18n';
import { dtPickerDate, CalendarDay} from './ng2-dtpicker.types';
import { ScrollToTargetDirective, OffsetTopDirective} from './ng2-dtpicker.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
	selector: 'ng2-dtpicker',
	templateUrl: './ng2-dtpicker.component.html',
	styleUrls: ['./ng2-dtpicker.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => Ng2DtpickerComponent),
		multi: true
	}]
})
export class Ng2DtpickerComponent implements OnInit, ControlValueAccessor {

	@ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;
	@ViewChild(ScrollToTargetDirective) list: ScrollToTargetDirective;

	// output events
    @Output('blur') blurEvent = new EventEmitter();
    @Output('focus') focusEvent = new EventEmitter();
    @Output('change') changeEvent = new EventEmitter();

    @HostListener('document:click', ['$event'])
	offClick(event) {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.close();
		}
	}

	date: dtPickerDate = {
		month: (new Date()).getMonth(),
		year: (new Date()).getFullYear(),
		day: (new Date()).getDay(),
		date: (new Date()).getDate()
	};
	value: string = null;
	months: string[] = [];
	years: number[] = [];
	days: CalendarDay[] = [];
	dayOfWeek: string[] = [];


	selectOpen: number = 0;
	isDateBoxOpen: boolean = false;


	private _onChange = (_: any) => { };

	constructor(private changeDetector : ChangeDetectorRef,
				private eRef: ElementRef) {}

	ngOnInit(): void {
		this.setDefaultLang("en");
		const thisYear = (new Date()).getFullYear();
		this.years = Array.from({length: 100}, (v, index)=>{ return index + thisYear - 70; });
	}

	registerOnChange (fn: any): void{
		this._onChange = fn;
	}

	registerOnTouched (fn: any): void{

	}

	writeValue (value: any): void {
		this.value = value;
    }

    onFocus (): void {
    	this.open();
    }

    onBlur(): void{

    }

    public open(): void{
		this._initDate();
		this._calculateDays();
    	this.isDateBoxOpen = true;
    }

    public close(): void{
    	this.isDateBoxOpen = false;
    }

	public setDefaultLang(langType: LangType): void{
		this.months = i18n[langType].months;
		this.dayOfWeek = i18n[langType].dayOfWeek;
	}

	handleMousedown($event){
		const target = $event.target as HTMLElement;

		if (!target.classList.contains('ng2-dtpicker-select-option')) {
			this.selectOpen = 0;
			return;
		}
	}

    handleClickMonthOption(month: number):void{
    	this.selectOpen = 0;
    	this.date.month = month;
    	this._calculateDays();
    }

    handleClickYearOption(year: number):void{
    	this.selectOpen = 0;
    	this.date.year = year;
    	this._calculateDays();
    }

    handleClickNextMonth():void{
    	if(this.date.month == 11){
    		this.date.month = 0;
    		this.date.year++;
    	}else{
    		this.date.month++;
    	}
    	this._calculateDays();
    }

    handleClickPrevMonth():void{
    	if(this.date.month == 0){
    		this.date.month = 0;
    		this.date.year--;
    	}else{
    		this.date.month--;
    	}
    	this._calculateDays();
    }

    handleClickThisMonth():void{
    	const now = new Date();
    	this.date.month = now.getMonth();
    	this.date.year = now.getFullYear();
    	this._calculateDays();
    }

    handleClickDate(date: number):void{
    	this.date.date = date;

    	let _month = (Array(2).join('0') + (this.date.month+1)).slice(-2);
    	let _date = (Array(2).join('0') + this.date.date).slice(-2);
    	this.value = this.date.year+'-'+_month+'-'+_date;
    	this._updateNgModel();
    	this.close();
    }

    handleClickMonthYearSelect($event, type: 1 | 2){
    	if(this.selectOpen == type){ return; }
    	this.selectOpen = type;
    	this.changeDetector.detectChanges();
    	if(type == 1){ //select month
    		this.list.scrollTop = this.listItems.find((_, i) => i === this.date.month).offsetTop;
    	}else{ //select year
    		const yearIndex = this.date.year + 70 - (new Date()).getFullYear();
    		this.list.scrollTop = this.listItems.find((_, i) => i === yearIndex).offsetTop;
    	}	
	}

	private _initDate(){
		let _date = new Date(this.value);
		if(_date.toString() === 'Invalid Date'){
			_date = new Date();
			this.value = '';
			this._updateNgModel();
		}

		this.date = {
			month: _date.getMonth(),
			year: _date.getFullYear(),
			day: _date.getDay(),
			date: _date.getDate()
		};
	}

	private _updateNgModel():void {
		const model:string = this.value;
    	this.changeEvent.emit({value: model});
    	this._onChange(model);

	}

	private _calculateDays(){
		const date = new Date(this.date.year, this.date.month, 1);

		const lastMonthDays = this.date.month === 0 ?  new Date(date.getFullYear()-1, 11, 0).getDate() : new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		const thisMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		const prefixLength = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		const suffixLength = 6 - new Date(date.getFullYear(), date.getMonth(), thisMonthDays).getDay();

		const prefix: CalendarDay[] = Array.from({length: prefixLength}, (v, index)=>{ 
			return {
				date: lastMonthDays - prefixLength + index + 1, 
				disabled: true
			}; 
		});

		const suffix: CalendarDay[] = Array.from({length: suffixLength}, (v, index)=>{ 
			return {
				date: index + 1, 
				disabled: true
			};
		});

		const middle: CalendarDay[] = Array.from({length: thisMonthDays}, (v, index)=>{ 
			return {
				date: index + 1, 
				disabled: false
			};
		});

		this.days = prefix.concat(middle, suffix);
	}


}
