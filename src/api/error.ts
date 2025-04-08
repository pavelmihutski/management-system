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

export type ApplicationErrorCode =
  | 'VALIDATION_ERROR'
  // Network request completed and server returned error 4xx/5xx
  | 'NETWORK_REQUEST_ERROR'
  // Network request "hard" fail(wasn't able to complete the request) - CORS, no internet, etc.
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'RUNTIME'
  | 'CONFIGURATION';

type ApplicationErrorContext = Record<string, unknown>;
