import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActualReportComponent } from './view-actual-report.component';

describe('ViewActualReportComponent', () => {
  let component: ViewActualReportComponent;
  let fixture: ComponentFixture<ViewActualReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActualReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActualReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
