import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingStaffComponent } from './waiting-staff.component';

describe('WaitingStaffComponent', () => {
  let component: WaitingStaffComponent;
  let fixture: ComponentFixture<WaitingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
