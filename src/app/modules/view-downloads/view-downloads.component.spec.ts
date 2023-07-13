import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDownloadsComponent } from './view-downloads.component';

describe('ViewDownloadsComponent', () => {
  let component: ViewDownloadsComponent;
  let fixture: ComponentFixture<ViewDownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDownloadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
