import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEducationComponent } from './manage-education.component';

describe('ManageEducationComponent', () => {
  let component: ManageEducationComponent;
  let fixture: ComponentFixture<ManageEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
