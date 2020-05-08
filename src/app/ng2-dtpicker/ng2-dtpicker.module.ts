import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2DtpickerComponent } from './ng2-dtpicker.component';
import { ScrollToTargetDirective, OffsetTopDirective } from './ng2-dtpicker.directive';

@NgModule({
  declarations: [
  	Ng2DtpickerComponent,
  	ScrollToTargetDirective,
  	OffsetTopDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
  	Ng2DtpickerComponent
  ]
})
export class Ng2DtpickerModule { }
