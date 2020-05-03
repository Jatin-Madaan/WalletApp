import { Time } from '@angular/common';
import { User } from './user.model';
import { Timestamp } from 'rxjs';

export class Transaction{
    transactionAmount : number;
    transactionType : String;
    transactionTime : Timestamp<Time>;
    beneficiaryId : number;
    userId : number;
}