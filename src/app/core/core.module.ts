import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DefaultInterceptor } from './interceptors/default.interceptor';
import {
  UserOutline,
  LockOutline,
  DashboardOutline,
  AppstoreOutline,
  BugOutline,
  PlusOutline,
  MonitorOutline,
  SettingOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UserOutline,
  LockOutline,
  DashboardOutline,
  AppstoreOutline,
  BugOutline,
  PlusOutline,
  MonitorOutline,
  SettingOutline,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
    NzNotificationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }]
})
export class CoreModule {
}
