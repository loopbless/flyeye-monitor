import { Component, OnInit } from '@angular/core';
import { PassportApi } from 'src/app/core/apis/passport.api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassportService } from 'src/app/core/services/passport.service';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private passport: PassportApi,
              private passportService: PassportService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['admin', Validators.required],
      password: ['111111', Validators.required],
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.passport.login(this.form.value).pipe(tap(({access_token}) => {
        this.passportService.setToken(access_token);
      }), switchMap(() => this.passport.getCurrentUser())).subscribe(data => {
        this.passportService.setUser(data);
        this.router.navigate(['/']);
      });
    }
  }
}
