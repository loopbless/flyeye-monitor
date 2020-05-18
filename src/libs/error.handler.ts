import { ErrorHandler, Inject } from '@angular/core';
import { computeStackTrace } from './tracekit';

export class MonitorErrorsHandler extends ErrorHandler {
  handleError(error) {
    computeStackTrace(error);
    super.handleError(error);
  }
}
