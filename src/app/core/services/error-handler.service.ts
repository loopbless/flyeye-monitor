import { ErrorHandler } from '@angular/core';
import * as fundebug from 'fundebug-javascript';

fundebug.init({ apikey: 'abfce523491859515a1b7310aef6cc356dc39349949ba3f2c695f3a10ce57b76' });

export class ErrorHandlerService extends ErrorHandler {

  handleError(error: any): void {
    if (window.onerror) {
      window.onerror(error);
    }
    super.handleError(error);
    fundebug.notifyError(error);
  }
}
