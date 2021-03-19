import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceDetailFpComponent } from './sales-invoice-detail-fp.component';

describe('SalesInvoiceDetailFpComponent', () => {
  let component: SalesInvoiceDetailFpComponent;
  let fixture: ComponentFixture<SalesInvoiceDetailFpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInvoiceDetailFpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceDetailFpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
