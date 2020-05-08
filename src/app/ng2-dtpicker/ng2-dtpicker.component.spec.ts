import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2DtpickerComponent } from './ng2-dtpicker.component';

describe('Ng2DtpickerComponent', () => {
  let component: Ng2DtpickerComponent;
  let fixture: ComponentFixture<Ng2DtpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2DtpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2DtpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
