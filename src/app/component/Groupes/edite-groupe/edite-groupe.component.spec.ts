import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeGroupeComponent } from './edite-groupe.component';

describe('EditeGroupeComponent', () => {
  let component: EditeGroupeComponent;
  let fixture: ComponentFixture<EditeGroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditeGroupeComponent]
    });
    fixture = TestBed.createComponent(EditeGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
