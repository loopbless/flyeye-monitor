import { ErrorHandler } from '@angular/core';

export class MonitorErrorsHandler extends ErrorHandler {

  handleError(error) {
    if (window.onerror) {
      window.onerror(error);
    }
    super.handleError(error);
  }
}
