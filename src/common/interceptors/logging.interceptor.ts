import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
// import chalk from 'chalk';
import * as colors from 'colors';
const console = new Logger('LoggingInterceptor');
colors.enable();
const method_color = {
  POST: 'yellow',
  DELETE: 'red',
  PUT: 'blue',
  GET: 'green',
  PATCH: 'rainbow',
};

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { protocol, method, url } = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const { statusCode } = context.switchToHttp().getResponse();
        const method_text = ` ${method}`[method_color[method]];
        console.log(
          `${protocol}`.italic +
            ':' +
            method_text.bold +
            ` ${url} ${statusCode}`.white.red,
        );
      }),
    );
  }
}
