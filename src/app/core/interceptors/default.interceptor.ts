import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NzNotificationService, NzNotificationRef } from 'ng-zorro-antd/notification';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import { PassportService } from '../services/passport.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  loginNotification: NzNotificationRef;

  constructor(private passport: PassportService,
              private router: Router,
              private notification: NzNotificationService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = this.passportHandler(req);
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.loginFailure();
          }
        }
        return throwError(error);
      }));
  }

  private passportHandler(req) {
    if(!req.params.get('passport_allowed')) {
      const token = this.passport.getToken();
      if (!token) this.loginFailure();
      return req.clone({
        headers: req.headers.set('Authorization', token)
      });
    }
    return req;
  }

  loginFailure() {
    if (!this.loginNotification) {
      this.loginNotification = this.notification.create(
        'info',
        '登录失效',
        '您的登录状态已失效，请重新登录！'
      );
      this.loginNotification.onClose.subscribe(() => {
        this.loginNotification = null;
      });
      this.router.navigate(['/passport/login']);
    }
  }
}
