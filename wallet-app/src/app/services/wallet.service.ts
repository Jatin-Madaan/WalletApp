import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../model/user.model';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http : HttpClient) { }

  userId : number ;
  balance:  number;

  baseUrl: string = "http://localhost:9091"

  
  //GET - getAllUsers()
  getAllUsers(){
    return this.http.get<User[]>(this.baseUrl + "/users");
  }
  //GET - getUserById()
  getUserById(id : number){
    return this.http.get<User>(this.baseUrl + "/users/" + id);
  }

  getUserByEmailId(emailId : String){
    return this.http.get<User[]>(this.baseUrl + "/user/email/" + emailId);
  }

  //POST - createNewUser()
  createNewUser(user : User){
    return this.http.post(this.baseUrl + "/user/add", user);
  }
  //PUT - updateUserById()
  updateUserById(user: User){
    return this.http.put(this.baseUrl + "/user/update", user);
  }

  getAllTransactions(id : number){
    return this.http.get(this.baseUrl + "/transaction/" + id);
  }

  addTransaction(transaction : Transaction){
    return this.http.post<Transaction>(this.baseUrl + "/transaction/add", transaction);
  }

}
