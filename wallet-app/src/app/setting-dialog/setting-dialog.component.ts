import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WalletService } from '../services/wallet.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.css']
})
export class SettingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private walletService: WalletService) { }

  user: User;
  ngOnInit() {
  }

  onSettingSubmit(value: any) {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem("userId"))).subscribe(data => {
      this.user = data;
      if (value.currpassword != this.user.userPassword) {
        console.log("password does'nt matched");
        return;
      }
      else {
        this.user.userName = value.username;
        this.user.userPassword = value.newpassword;
        this.walletService.updateUserById(this.user).subscribe();
      }
    });
  }

}
