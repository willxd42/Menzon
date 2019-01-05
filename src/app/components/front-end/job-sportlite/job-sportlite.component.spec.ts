import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSportliteComponent } from './job-sportlite.component';

describe('JobSportliteComponent', () => {
  let component: JobSportliteComponent;
  let fixture: ComponentFixture<JobSportliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSportliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSportliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
