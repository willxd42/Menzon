import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRefereesComponent } from './edit-referees.component';

describe('EditRefereesComponent', () => {
  let component: EditRefereesComponent;
  let fixture: ComponentFixture<EditRefereesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRefereesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRefereesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
