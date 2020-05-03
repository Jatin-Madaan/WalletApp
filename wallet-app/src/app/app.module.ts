import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatChipsModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent, SuccessSnackBarComponent } from './components/register-user/register-user.component';
import { ServicesOfferedComponent } from './components/services-offered/services-offered.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';
import { ShowBalanceComponent } from './components/show-balance/show-balance.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { OperationsComponent, WarningDialogComponent } from './components/operations/operations.component';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterUserComponent,
    ServicesOfferedComponent,
    AboutusComponent,
    AccountComponent,
    ShowBalanceComponent,
    TransactionsComponent,
    OperationsComponent,
    SettingDialogComponent,
    SuccessSnackBarComponent,
    WarningDialogComponent
  ],
  entryComponents: [SettingDialogComponent, SuccessSnackBarComponent, WarningDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
