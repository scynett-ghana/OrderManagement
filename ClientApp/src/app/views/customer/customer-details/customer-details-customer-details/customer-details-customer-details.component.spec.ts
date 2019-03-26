import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsCustomerDetailsComponent } from './customer-details-customer-details.component';

describe('CustomerDetailsCustomerDetailsComponent', () => {
  let component: CustomerDetailsCustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
