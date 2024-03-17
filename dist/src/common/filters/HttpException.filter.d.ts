import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost): void;
}
export declare class AnyExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
