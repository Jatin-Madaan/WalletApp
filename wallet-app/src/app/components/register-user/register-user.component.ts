import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../../services/wallet.service'
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild("tabGroup", {static: true}) tabGroup;
  constructor(private route: Router, private walletService: WalletService, private _snackBar: MatSnackBar) { }

  //patterns

  unamePattern: String = "^[a-z0-9_-]{3,15}$";
  emailPattern: String = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  //-------------------

  usersList: User[];
  flag = true;
  newUser: User;
  signInError: Boolean = false;
  signInErrorMsg: String;
  signUpError: Boolean = false;
  signUpErrorMsg: String;
  ngOnInit() {
  }

  onSignInSubmit(value: any) {
    this.walletService.getUserByEmailId(value.email).subscribe(data => {
      this.usersList = data;
      this.usersList.forEach((user) => {
        if (user.userEmailId == value.email) {
          if (user.userPassword == value.password) {
            localStorage.setItem('username', value.email);
            localStorage.setItem('userId', user.userId.toString());
            sessionStorage.setItem('username', value.email);
            this.walletService.userId = user.userId;
            //this.router.navigate(['account']);
            window.location.href = "/account";
            return;
          }
        }
      });
    }, err => {
      console.log(err.ok, err.error);
      this.signInError = !err.ok;
      this.signInErrorMsg = err.error;
    });
  }

  onSignUpSubmit(value: any) {
    
    this.newUser = new User();
    this.newUser.userName = value.username;
    this.newUser.userPassword = value.password;
    this.newUser.userEmailId = value.email;
    this.walletService.createNewUser(this.newUser).subscribe(data => {
      //for snackbar popup
      this._snackBar.openFromComponent(SuccessSnackBarComponent, {
        duration: 5 * 1000,
      });
      this.tabGroup.selectedIndex = 0;
    },
    err => {
      this.signUpError = !err.ok;
      this.signUpErrorMsg = err.error.text;
    });
  }

}




@Component({
  selector: 'success-snack-bar',
  templateUrl: 'success-snack-bar.html',
  styles: [`
    .success-msg {
      color: hotpink;
    }
  `],
})
export class SuccessSnackBarComponent { }
