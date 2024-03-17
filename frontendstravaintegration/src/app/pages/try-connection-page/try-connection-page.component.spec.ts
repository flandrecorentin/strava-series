import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TryConnectionPageComponent} from './try-connection-page.component';

describe('TryConnectionComponent', () => {
  let component: TryConnectionPageComponent;
  let fixture: ComponentFixture<TryConnectionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TryConnectionPageComponent]
    });
    fixture = TestBed.createComponent(TryConnectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
