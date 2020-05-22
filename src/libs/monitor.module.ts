import { ModuleWithProviders, NgModule } from '@angular/core';
import { MONITOR_CONFIG, MonitorReportService } from './monitor-report.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MonitorInterceptor } from './monitor.interceptor';

@NgModule({
  imports: [RouterModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class MonitorModule {
  static forRoot(data: {
    appId: string;
    domain?: string;
  }): ModuleWithProviders<any> {
    return {
      ngModule: MonitorModule,
      providers: [
        MonitorReportService,
        { provide: HTTP_INTERCEPTORS, useClass: MonitorInterceptor, multi: true },
        {
          provide: MONITOR_CONFIG,
          useValue: data
        }
      ]
    };
  }
}


