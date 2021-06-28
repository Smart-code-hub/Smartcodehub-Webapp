import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'verify/:id', component: VerifyemailComponent },
  { path: 'register', component: RegisterComponent }
];
@NgModule({
  declarations: [RegisterComponent, LoginComponent, VerifyemailComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    SecurityRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ]
})
export class SecurityModule {}
