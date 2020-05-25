import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxDatetimepickerModule } from './ngx-datetimepicker/ngx-datetimepicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxDatetimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
