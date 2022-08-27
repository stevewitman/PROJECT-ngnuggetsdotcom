import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUploadPostThumbsComponent } from './manual-upload-post-thumbs.component';

describe('ManualUploadPostThumbsComponent', () => {
  let component: ManualUploadPostThumbsComponent;
  let fixture: ComponentFixture<ManualUploadPostThumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualUploadPostThumbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualUploadPostThumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
