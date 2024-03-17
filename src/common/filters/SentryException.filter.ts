// import {
//   Catch,
//   HttpException,
//   ExceptionFilter,
//   ArgumentsHost,
// } from '@nestjs/common';
// import { Response } from 'express';
// import * as Sentry from '@sentry/node';

// @Catch()
// export class SentryExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest();

//     if (exception instanceof HttpException) {
//       const status = exception.getStatus();
//       const message = exception.message;

//       response.status(status).json({
//         statusCode: status,
//         message: message,
//       });
//     } else {
//       // Capture all other exceptions with Sentry
//       Sentry.captureException(exception);

//       response.status(500).json({
//         statusCode: 500,
//         message: 'Internal Server Error',
//       });
//     }
//   }
// }
