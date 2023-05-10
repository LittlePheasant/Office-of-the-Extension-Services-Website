import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserlistComponent } from './view-userlist.component';

describe('ViewUserlistComponent', () => {
  let component: ViewUserlistComponent;
  let fixture: ComponentFixture<ViewUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
