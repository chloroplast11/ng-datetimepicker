import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Ng2DtpickerModule } from './ng2-dtpicker/ng2-dtpicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2DtpickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
