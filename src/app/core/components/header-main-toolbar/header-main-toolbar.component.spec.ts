import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainToolbarComponent } from './header-main-toolbar.component';

describe('HeaderMainToolbarComponent', () => {
  let component: HeaderMainToolbarComponent;
  let fixture: ComponentFixture<HeaderMainToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMainToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
