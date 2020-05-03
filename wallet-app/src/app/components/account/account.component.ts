import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingDialogComponent } from 'src/app/setting-dialog/setting-dialog.component';
import { WalletService } from '../../services/wallet.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public dialog: MatDialog, private walletService : WalletService) { }

  user : User;

  ngOnInit() {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.user = data;
    });
  }

  openDialog(){
    let dialogRef =  this.dialog.open(SettingDialogComponent, {data : {name: 'user'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`);
    });
  }

}
