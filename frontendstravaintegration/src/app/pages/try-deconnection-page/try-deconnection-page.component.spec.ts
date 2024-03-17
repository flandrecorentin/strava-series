import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TryDeconnectionPageComponent} from './try-deconnection-page.component';

describe('TryDeconnectionPageComponent', () => {
  let component: TryDeconnectionPageComponent;
  let fixture: ComponentFixture<TryDeconnectionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TryDeconnectionPageComponent]
    });
    fixture = TestBed.createComponent(TryDeconnectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
