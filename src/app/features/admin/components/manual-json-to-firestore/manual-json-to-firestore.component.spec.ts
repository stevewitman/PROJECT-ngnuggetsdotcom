import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualJsonToFirestoreComponent } from './manual-json-to-firestore.component';

describe('ManualJsonToFirestoreComponent', () => {
  let component: ManualJsonToFirestoreComponent;
  let fixture: ComponentFixture<ManualJsonToFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualJsonToFirestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualJsonToFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
