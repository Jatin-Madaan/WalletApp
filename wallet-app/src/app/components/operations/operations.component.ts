import { Component, OnInit, Inject } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { User } from '../../model/user.model';
import { Transaction } from '../../model/transaction.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  panelOpenState = false;
  constructor(private walletService: WalletService, public dialog: MatDialog) { }
  user: User;
  reciever: User;

  ngOnInit() {
  }

  transaction: Transaction;

  // for withdrawing amount

  withdraw(amount: number) {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.user = data;

      console.log(amount, this.user);

      if (amount < this.user.userBalance) {
        this.walletService.balance -= Number.parseInt(amount.toString());

        this.user.userBalance = this.walletService.balance;
        this.walletService.updateUserById(this.user).subscribe(data => {
          this.transaction = new Transaction();
          this.transaction.userId = Number.parseInt(localStorage.getItem('userId'));
          this.transaction.transactionType = "Withdraw";
          this.transaction.transactionAmount = amount;
          this.transaction.beneficiaryId = Number.parseInt(localStorage.getItem('userId'));
          this.walletService.addTransaction(this.transaction).subscribe();
        });
      }
      else {
        this.dialog.open(WarningDialogComponent, {
          width: '250px',
          data: { msg: `Not Enough Balance for this Transaction :(` }
        });
      }
      //this.user.userBalance -= amount;


    });

  }


  // for depositing amount
  deposit(amount: number) {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.user = data;

      console.log(amount, this.user);


      //this.user.userBalance -= amount;
      this.walletService.balance += Number.parseInt(amount.toString());

      this.user.userBalance = this.walletService.balance;
      this.walletService.updateUserById(this.user).subscribe(data => {
        this.transaction = new Transaction();
        this.transaction.userId = Number.parseInt(localStorage.getItem('userId'));
        this.transaction.transactionType = "deposit"
        this.transaction.transactionAmount = amount;
        this.transaction.beneficiaryId = Number.parseInt(localStorage.getItem('userId'));
        this.walletService.addTransaction(this.transaction).subscribe();
      });

    });
  }

  transfer(amount: number, reciever_id: number) {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.user = data;

      if (this.user.userBalance > amount) {
      
        //this.user.userBalance -= amount;
        this.walletService.balance -= amount;
        this.user.userBalance = this.walletService.balance;
        this.walletService.updateUserById(this.user).subscribe(data => {

          this.transaction = new Transaction();
          this.transaction.userId = Number.parseInt(localStorage.getItem('userId'));
          this.transaction.transactionType = "transfer"
          this.transaction.transactionAmount = amount;
          this.transaction.beneficiaryId = reciever_id;
          this.walletService.addTransaction(this.transaction).subscribe();

          this.walletService.getUserById(reciever_id).subscribe(data => {
            this.reciever = data;
            this.reciever.userBalance += Number.parseInt(amount.toString());
            this.walletService.updateUserById(this.reciever).subscribe(data => {
              this.transaction = new Transaction();
              this.transaction.userId = reciever_id;
              this.transaction.transactionType = "credited"
              this.transaction.transactionAmount = amount;
              this.transaction.beneficiaryId = Number.parseInt(localStorage.getItem('userId'));
              this.walletService.addTransaction(this.transaction).subscribe();
            });
          });
        });
      }
      else {
        this.dialog.open(WarningDialogComponent, {
          width: '250px',
          data: { msg: `Not Enough Balance for this Transaction :(` }
        });
      }
    });
  }
}

export interface DialogData {
  msg: string;
}


@Component({
  selector: 'warning-dialog-component',
  templateUrl: 'warning-dialog.html',
})
export class WarningDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onExit(): void {
    this.dialogRef.close();
  }

}
