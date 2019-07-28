import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLatterComponent } from './news-latter.component';

describe('NewsLatterComponent', () => {
  let component: NewsLatterComponent;
  let fixture: ComponentFixture<NewsLatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
