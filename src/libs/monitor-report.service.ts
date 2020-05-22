import { Inject, Injectable, InjectionToken, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { computeStackTrace } from './tracekit';
import { filter } from 'rxjs/operators';


export const MONITOR_CONFIG = new InjectionToken('monitor_config');

export enum MonitorType {
  ERROR = 'ERROR', // 错误、异常
}


export class ReportVo {
  platform: string;
  version: string;
  appId: string;
  type: MonitorType;
  tags: string[];
  timestamp: number;
  currentUrl: string;
  fromUrl?: string;
  data: any;
}

@Injectable()
export class MonitorReportService {
  fromUrl: string;
  currentUrl: string;

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(MONITOR_CONFIG) private config: any) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        this.fromUrl = this.currentUrl;
        this.currentUrl = data.url;
      });
    window.onerror = this.errorListener.bind(this);
  }

  errorListener(event) {
    this.report({
      type: MonitorType.ERROR,
      tags: ['javascript'],
      data: event
    })
  }

  report(params: {
    type: MonitorType,
    tags: string[],
    data: Error | any;
  }) {
    const data = new ReportVo();
    data.timestamp = Date.now();
    data.appId = this.config.appId;
    data.platform = 'angular';
    data.version = VERSION.full;
    data.type = params.type;
    data.tags = params.tags;
    if (this.fromUrl) {
      data.fromUrl = this.fromUrl;
    }
    if (this.currentUrl || this.router.url) {
      data.currentUrl = this.currentUrl || this.router.url;
    }
    if (params.data) {
      if (params.data instanceof Error) {
        data.data = JSON.stringify(computeStackTrace(params.data));
      } else {
        const paramsData: any = {};
        const keys = Object.keys(params.data);
        keys.forEach((key: string) => {
          if (params.data[key] !== null && params.data[key] !== undefined) {
            paramsData[key] = params.data[key];
          }
        });
        data.data = JSON.stringify(paramsData);
      }
    }
    this.fetch(`http://localhost:3000/monitors`, data, 'POST');
  }


  obj2String(obj, arr = [], idx = 0) {
    for (let item in obj) {
      arr[idx++] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
  }

  async fetch(url = '', data = {}, type = 'GET', method = 'fetch') {
    type = type.toUpperCase();
    const searchStr = this.obj2String(data);
    if (type == 'GET') {
      let dataStr = ''; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      });

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }

    if (window.fetch && method == 'fetch') {
      let requestConfig: any = {
        method: type,
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        mode: "no-cors",//请求的模式
        body: searchStr
      };
      return await fetch(url, requestConfig);
    } else {
      return new Promise((resolve, reject) => {
        let requestObj;
        if (window.XMLHttpRequest) {
          requestObj = new XMLHttpRequest();
        } else {
          requestObj = new (window as any).ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
          sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
          if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
              let obj = requestObj.response;
              if (typeof obj !== 'object') {
                obj = JSON.parse(obj);
              }
              resolve(obj);
            } else {
              reject(requestObj);
            }
          }
        };
      });
    }
  }

}
