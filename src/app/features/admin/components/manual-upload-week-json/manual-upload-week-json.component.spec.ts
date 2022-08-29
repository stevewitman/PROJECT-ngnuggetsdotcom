import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUploadWeekJsonComponent } from './manual-upload-week-json.component';

describe('ManualUploadWeekJsonComponent', () => {
  let component: ManualUploadWeekJsonComponent;
  let fixture: ComponentFixture<ManualUploadWeekJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualUploadWeekJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualUploadWeekJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
