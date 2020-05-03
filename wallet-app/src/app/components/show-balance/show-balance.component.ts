import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service'
import { User } from '../../model/user.model';

@Component({
  selector: 'app-show-balance',
  templateUrl: './show-balance.component.html',
  styleUrls: ['./show-balance.component.css']
})
export class ShowBalanceComponent implements OnInit {


  constructor(private walletService : WalletService) { }
  user : User;

  ngOnInit() {
    this.walletService.getUserById(Number.parseInt(localStorage.getItem("userId"))).subscribe(data => {
      this.user = data;
      this.walletService.balance = this.user.userBalance;
    });

  }

}
