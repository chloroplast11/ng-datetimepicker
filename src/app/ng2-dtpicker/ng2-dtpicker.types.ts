export interface dtPickerDate {
	year: number,
	month: number,
	date: number,
	day: number
}

export interface CalendarDay {
	date: number,
	disabled: boolean,
	isToday?: boolean
}