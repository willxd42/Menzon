import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefereesComponent } from './add-referees.component';

describe('AddRefereesComponent', () => {
  let component: AddRefereesComponent;
  let fixture: ComponentFixture<AddRefereesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRefereesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefereesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
