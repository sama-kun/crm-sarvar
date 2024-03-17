import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    statusCode: number;
    data?: T;
    error?: {
        message: string;
        details: any;
    };
}
export declare function SkipRestInterceptor(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
