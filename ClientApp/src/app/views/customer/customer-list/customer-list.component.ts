import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface UserData {
  customerId: number;
  customerNumber: string;
  companyName: string;
  ownerName: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    'customerNumber',
    'companyName',
    'ownerName',
    'address',
    'phone',
    'action'
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customerLists: UserData[] = [
    {
      customerId: 1,
      customerNumber: '02477321',
      companyName: 'John Doe1',
      ownerName: 'Johnson',
      address: 'Kasoa1',
      phone: '02552'
    },
    {
      customerId: 2,
      customerNumber: '02477322',
      companyName: 'John Doe2',
      ownerName: 'Johnson',
      address: 'Kasoa2',
      phone: '02552'
    },
    {
      customerId: 3,
      customerNumber: '0247733223',
      companyName: 'John Doe3',
      ownerName: 'Johnson',
      address: 'Kasoa3',
      phone: '02552'
    },
    {
      customerId: 4,
      customerNumber: '02477324',
      companyName: 'John Doe4',
      ownerName: 'Johnson',
      address: 'Kasoa4',
      phone: '02552'
    },
    {
      customerId: 5,
      customerNumber: '02477325',
      companyName: 'John Doe5',
      ownerName: 'Johnson',
      address: 'Kasoa5',
      phone: '02552'
    }
  ];

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.customerLists);
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

  customerDeleteDetails() {}
}
