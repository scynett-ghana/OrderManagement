import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTaxesComponent } from './company-taxes.component';

describe('CompanyTaxesComponent', () => {
  let component: CompanyTaxesComponent;
  let fixture: ComponentFixture<CompanyTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
