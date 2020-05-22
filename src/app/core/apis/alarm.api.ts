import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AlarmDto {
  id?: number;
  appId: number;
  dataType: string;
  dataTags: string[];
  mode: string;
  target: string;
  template: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlarmApi {

  constructor(private http: HttpClient) {
  }

  getModeList() {
    return of([
      { label: 'WebHook', value: 'webhook' },
      { label: '邮箱', value: 'email' },
      { label: '手机', value: 'mobile', disabled: true },
    ]);
  }

  findAll(page: { appId: number; limit: number; offset: number }) {
    return this.http.get(environment.contextPath.monitor + '/alarms', {
      params: page as any,
      observe: 'response'
    }).pipe(map((res => {
      return { total: parseInt(res.headers.get('X-total-count')), data: res.body as any[] };
    })));
  }

  save(alarm: AlarmDto) {
    if (alarm.id) {
      return this.update(alarm);
    }
    return this.insert(alarm);
  }

  update(alarm: AlarmDto) {
    return this.http.patch(environment.contextPath.monitor + '/alarms', alarm);
  }

  insert(alarm: AlarmDto) {
    return this.http.post(environment.contextPath.monitor + '/alarms', alarm);
  }
}
