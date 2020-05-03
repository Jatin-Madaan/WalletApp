import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.isLogin){
      this.router.navigate(['account']);
    }
  }
  isLogin : boolean = localStorage.length > 0;
  
  onSignoutSubmit(){
    localStorage.clear();
    //this.router.navigate(['']);
  }
  
  onSignupSubmit(){
    console.log(this.isLogin);
  }
}
