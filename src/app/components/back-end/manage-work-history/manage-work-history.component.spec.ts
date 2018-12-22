import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkHistoryComponent } from './manage-work-history.component';

describe('ManageWorkHistoryComponent', () => {
  let component: ManageWorkHistoryComponent;
  let fixture: ComponentFixture<ManageWorkHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
