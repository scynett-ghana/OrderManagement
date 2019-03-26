import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsClosedInvoicesComponent } from './customer-details-closed-invoices.component';

describe('CustomerDetailsClosedInvoicesComponent', () => {
  let component: CustomerDetailsClosedInvoicesComponent;
  let fixture: ComponentFixture<CustomerDetailsClosedInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailsClosedInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsClosedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
