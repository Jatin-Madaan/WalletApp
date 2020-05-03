import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { WalletService } from 'src/app/services/wallet.service';
import { Transaction } from 'src/app/model/transaction.model';
import { Time } from '@angular/common';

export interface TransactionInfo {
  transactionId: number,
  transactionAmount: number,
  transactionType: String,
  transactionTime: Time,
  beneficiaryId: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  ELEMENT_DATA: TransactionInfo[];
  displayedColumns: string[] = ['transactionId', 'transactionAmount', 'transactionType', 'transactionTime', 'beneficiaryId'];
  dataSource = new MatTableDataSource<TransactionInfo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllTransaction();
  }
  public getAllTransaction() {
    this.walletService.getAllTransactions(Number.parseInt(localStorage.getItem('userId'))).subscribe(data => this.dataSource.data = data as TransactionInfo[]);
  }

  applyFilter(filterValue : String){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
