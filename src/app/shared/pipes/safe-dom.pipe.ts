import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { upperFirst } from 'lodash';

@Pipe({
  name: 'safeDom'
})
export class SafeDomPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(value: string, key: 'html' | 'resourceUrl' | 'script' | 'url' | 'style' = 'html'): SafeHtml {
    if (!value) return value;
    const safeFn = this._sanitizer[`bypassSecurityTrust${upperFirst(key)}`];
    if (safeFn) {
      return safeFn(value);
    } else {
      throw new Error('`key` 不存在！');
    }
  }

}
