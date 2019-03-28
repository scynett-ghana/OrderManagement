import {
  MatDialogRef,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from '@angular/material';
import { ClosedInvoiceDialogComponent } from './closed-invoices-details.component';
import { ViewChild, OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

export interface CustomerClosedInvoice {
  invoiceID: string;
  purchaseDate: string;
  totalAmount: string;
  amountPaid: string;
  status: string;
}

@Component({
  selector: 'app-customer-details-closed-invoices',
  templateUrl: './customer-details-closed-invoices.component.html',
  styleUrls: ['./customer-details-closed-invoices.component.scss']
})
export class CustomerDetailsClosedInvoicesComponent implements OnInit {
  closedInvoiceDialogBox: MatDialogRef<ClosedInvoiceDialogComponent>;
  displayedColumns: string[] = [
    'invoiceID',
    'purchaseDate',
    'totalAmount',
    'amountPaid',
    'status'
  ];
  dataSource: MatTableDataSource<CustomerClosedInvoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerClosedInvoices: CustomerClosedInvoice[] = [
    {
      invoiceID: '1',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '2',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '3',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '4',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '5',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    },
    {
      invoiceID: '6',
      purchaseDate: '23',
      totalAmount: '60',
      amountPaid: '100',
      status: '300'
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.customerClosedInvoices);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customerEditViewDetails(specifiedUrl: string, customerId: string) {
    if (specifiedUrl === '/view') {
      this.router.navigate(['/customer/details', customerId]);
    } else {
      this.router.navigate(['/customer/form', customerId]);
    }
  }

  closedInvoiceDialog() {
    this.closedInvoiceDialogBox = this.dialog.open(
      ClosedInvoiceDialogComponent,
      { width: '800px' }
    );
    console.log('Hello');
  }

  customerDeleteDetails() {}
}
