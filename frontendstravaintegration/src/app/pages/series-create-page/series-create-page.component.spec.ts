import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeriesCreatePageComponent} from './series-create-page.component';

describe('SeriesCreatePageComponent', () => {
  let component: SeriesCreatePageComponent;
  let fixture: ComponentFixture<SeriesCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesCreatePageComponent]
    });
    fixture = TestBed.createComponent(SeriesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
