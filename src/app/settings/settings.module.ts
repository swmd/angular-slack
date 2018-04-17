import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../shared/layout/layout.module';
import { AuthModule } from '../auth/auth.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule,
    SettingsRoutingModule,
    PasswordStrengthBarModule
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    }
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
