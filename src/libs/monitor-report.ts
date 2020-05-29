import { computeStackTrace } from './tracekit';



export enum EventType {
  ERROR = 'ERROR', // 错误、异常
}


export class ReportVo {
  platform: string;
  version: string;
  appId: string;
  type: EventType;
  tags: string[];
  timestamp: number;
  currentUrl: string;
  language: string = navigator.language || (navigator as any).userLanguage;
  fromUrl?: string;
  data: any;
}

export class MonitorReport {
  settings: any;

  constructor() {
    window.onerror = this.errorListener.bind(this);
  }

  static settings(data: any) {
    if (data) {
      this.settings = data;
    }
  }

  errorListener(event) {
    this.report({
      type: EventType.ERROR,
      tags: ['javascript'],
      data: event
    });
  }

  report(params: {
    type: EventType,
    tags: string[],
    data: Error | any;
  } = { type: EventType.ERROR, tags: ['javascript'], data: null }) {
    const data = new ReportVo();
    data.timestamp = Date.now();
    data.type = params.type;
    data.tags = params.tags;
    if (params.data) {
      if (params.data instanceof Error) {
        data.data = JSON.stringify(computeStackTrace(params.data));
      } else {
        data.data = JSON.stringify(params.data);
      }
    }
    this.fetch(this.settings.domain || `http://localhost:3000/monitors`, data, 'POST');
  }


  obj2String(obj, arr = [], idx = 0) {
    for (let item in obj) {
      arr[idx++] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
  }

  // post  navigator.sendBeacon
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
