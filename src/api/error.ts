export class ApplicationError extends Error {
  constructor(code: ApplicationErrorCode, message?: string, context?: ApplicationErrorContext) {
    super(`ApplicationError: (${code}) ${message ?? ''}`);

    this.code = code;
    this.context = context;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  code: ApplicationErrorCode;
  context?: ApplicationErrorContext;
}

export type ApplicationErrorCode = 'VALIDATION_ERROR' | 'NETWORK_REQUEST_ERROR' | 'NETWORK_ERROR';

type ApplicationErrorContext = Record<string, unknown>;
