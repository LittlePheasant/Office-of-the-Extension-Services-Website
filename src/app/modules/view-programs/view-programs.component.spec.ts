import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramsComponent } from './view-programs.component';

describe('ViewProgramsComponent', () => {
  let component: ViewProgramsComponent;
  let fixture: ComponentFixture<ViewProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
