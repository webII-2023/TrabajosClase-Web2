import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesComponent } from './choferes.component';

describe('ChoferesComponent', () => {
  let component: ChoferesComponent;
  let fixture: ComponentFixture<ChoferesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoferesComponent]
    });
    fixture = TestBed.createComponent(ChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
