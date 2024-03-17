import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeriesPageComponent} from './series-page.component';

describe('SeriesPageComponent', () => {
  let component: SeriesPageComponent;
  let fixture: ComponentFixture<SeriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesPageComponent]
    });
    fixture = TestBed.createComponent(SeriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
