import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualReverseJsonComponent } from './manual-reverse-json.component';

describe('ManualReverseJsonComponent', () => {
  let component: ManualReverseJsonComponent;
  let fixture: ComponentFixture<ManualReverseJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualReverseJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualReverseJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
