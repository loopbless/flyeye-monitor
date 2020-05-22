import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MonitorReportService, MonitorType } from './monitor-report.service';

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  constructor(private report: MonitorReportService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          const params = {};
          const keys = req.params.keys();
          keys.forEach(key => {
            params[key] = req.params.get(key);
          });
          this.report.report({
            type: MonitorType.ERROR,
            tags: ['api'],
            data: {
              url: req.url,
              params: keys.length > 0 ? params : null,
              body: req.body,
              method: req.method,
              response: error.error
            }
          });
        }
        return throwError(error);
      }));
  }

}
