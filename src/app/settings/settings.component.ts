import { Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { ToasterService } from 'angular2-toaster';
import { BaseComponent } from '../shared/base/basecomponent.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAuthService } from '../shared/auth/iauth-service.interface';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: [
    'settings.component.scss'
  ]
})
export class SettingsComponent extends BaseComponent implements OnInit {
  private toasterService: ToasterService;
  /**
   * The settings form
   */
  public settingsForm: FormGroup;

  /**
   * Determines if a submit is in progress
   */
  public submitInProgress: boolean;

  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  public passObject: any;
  public error: string;
  public passwordStrength: boolean;

  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService, toasterService: ToasterService) {
    super();
    this.passObject = {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: ''
    };
    
    this.error = '';
    this.passwordStrength = false;
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Handles the onsubmit of the form
   */
  public onSubmit() {
    this.submitInProgress = true;

    if (!this.settingsForm.valid) {
      this.submitInProgress = false;
      return;
    }

    let passwordObject = {
      oldpwd: this.passObject.oldPassword,
      newpwd: this.passObject.newPassword
    };

    this.authService.changePassword(passwordObject).subscribe((res) => {
      this.submitInProgress = false;
      this.toasterService.pop('success', 'Success', 'Changed password successfully');
    }, error => {
      this.submitInProgress = false;
      let errorObject = JSON.parse(error._body);
      this.toasterService.pop('error', 'Error', errorObject.error);
    });    
  }

  public onPasswordChange() {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.passwordStrength = !strongRegex.test(this.passObject.newPassword);
    console.log('strong: ', this.passwordStrength)
  }

  /**
   * Initializes the form
   */
  private initForm() {

    function passwordMatchValidator(g: FormGroup) {
      if (g.get('newPassword').value !== g.get('passwordConfirm').value) {
        g.get('passwordConfirm').setErrors({mismatch: true});
        return {mismatch: true};
      }
      return null;
    }

    this.settingsForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
    }, passwordMatchValidator);
  }

  private getRequestOptions(): RequestOptionsArgs {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return {
      headers: headers
    };
  }
}
