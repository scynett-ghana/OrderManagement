import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsOpenInvoiceComponent } from './customer-details-open-invoice.component';

describe('CustomerDetailsOpenInvoiceComponent', () => {
  let component: CustomerDetailsOpenInvoiceComponent;
  let fixture: ComponentFixture<CustomerDetailsOpenInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsOpenInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsOpenInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
