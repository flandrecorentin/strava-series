import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieFormComponent } from './serie-form.component';

describe('SerieFormComponent', () => {
  let component: SerieFormComponent;
  let fixture: ComponentFixture<SerieFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerieFormComponent]
    });
    fixture = TestBed.createComponent(SerieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
