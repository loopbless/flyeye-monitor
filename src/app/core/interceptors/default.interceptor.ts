import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { NzNotificationRef, NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { PassportService } from '../services/passport.service';
import { Router } from '@angular/router';
import { catchError, filter, take, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalStorage } from '../services/local-storage.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  loginNotification: NzNotificationRef;

  cancellation$ = new BehaviorSubject<boolean>(false);

  constructor(private passport: PassportService,
              private router: Router,
              private storage: LocalStorage,
              private message: NzMessageService,
              private notification: NzNotificationService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 取消状态下不发送任何请求，并取消掉正在进行中的请求
    if (this.cancellation$.getValue()) {
      return of();
    }
    const request = this.passportHandler(req);
    return next.handle(request).pipe(
      takeUntil(this.cancellation$.pipe(filter(data => !!data), take(1))),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.loginFailure();
          } else {
            this.message.error(error.error.message);
          }
        }
        return throwError(error);
      }));
  }

  private passportHandler(req) {
    if (!req.params.get('passport_allowed')) {
      const token = this.passport.getToken();
      if (!token) {
        this.loginFailure(false);
      }
      return req.clone({
        headers: req.headers.set('Authorization', token)
      });
    }
    return req;
  }

  loginFailure(notice = true) {
    if (!this.loginNotification) {
      this.cancellation$.next(true);
      if (notice) {
        this.storage.clear();
        this.loginNotification = this.notification.create(
          'info',
          '登录失效',
          '您的登录状态已失效，请重新登录！'
        );
        this.loginNotification.onClose.subscribe(() => {
          this.loginNotification = null;
          this.cancellation$.next(false);
        });
      }
      this.router.navigate(['/passport/login']);
    }
  }
}
