import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSingleComponent } from './jobs-single.component';

describe('JobsSingleComponent', () => {
  let component: JobsSingleComponent;
  let fixture: ComponentFixture<JobsSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
