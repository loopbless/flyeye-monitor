import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PassportRoutingModule } from './passport-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
