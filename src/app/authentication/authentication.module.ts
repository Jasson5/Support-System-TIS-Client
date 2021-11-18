import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserDatastoreService } from './services/user-datastore.service';
import { UserService } from './services/user.service';
import { JwtDecodeService } from './services/jwt-decode.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    providers: [
      AuthGuardService,
      AuthService,
      UserDatastoreService,
      UserService,
      JwtDecodeService
    ]
})
export class AuthenticationModule { }
