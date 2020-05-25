import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatepickerComponent } from './ngx-datepicker/ngx-datepicker.component';
import { ScrollToTargetDirective, OffsetTopDirective } from './ngx-datetimepicker.directive';
import { NgxTimepickerComponent } from './ngx-timepicker/ngx-timepicker.component';

@NgModule({
  declarations: [
  	NgxDatepickerComponent,
  	ScrollToTargetDirective,
  	OffsetTopDirective,
  	NgxTimepickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	NgxDatepickerComponent,
  	NgxTimepickerComponent
  ]
})
export class NgxDatetimepickerModule { }
