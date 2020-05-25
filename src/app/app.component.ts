import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ng2-datetimepicker';
	date = 'qwe';
	time = '9:00';


	onDateChange(e){
		console.log(e);
	}

	onTimeChange(e){
		console.log(e);
	}
}
