import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RevokeAccessPageComponent} from './revoke-access-page.component';

describe('RevokeAccessPageComponent', () => {
  let component: RevokeAccessPageComponent;
  let fixture: ComponentFixture<RevokeAccessPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeAccessPageComponent]
    });
    fixture = TestBed.createComponent(RevokeAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
