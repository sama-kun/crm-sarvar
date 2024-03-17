"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyExceptionFilter = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.response.message
            ? typeof exception.response.message === 'string'
                ? exception.response.message
                : exception.response.message.join(', ')
            : exception.message || 'Unknown error';
        const stack = exception.stack;
        try {
            const error = {
                message,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                body: request.body,
                params: request.params,
                query: request.query,
                headers: request.headers,
                cookies: request.cookies,
                stack,
            };
            if (response.status)
                response.status(status).json({
                    error,
                });
            else
                response.json({ error });
        }
        catch (e) {
            common_1.Logger.error(e);
        }
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
let AnyExceptionFilter = class AnyExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        var _a, _b, _c;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse
            ? ctx.getResponse()
            : {};
        const request = ctx.getRequest
            ? ctx.getRequest()
            : {};
        const status = exception.getStatus ? exception.getStatus() : 500;
        const message = ((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.message)
            ? (_b = exception === null || exception === void 0 ? void 0 : exception.response) === null || _b === void 0 ? void 0 : _b.message.toString()
            : false || ((_c = response === null || response === void 0 ? void 0 : response.message) === null || _c === void 0 ? void 0 : _c.join)
                ? response === null || response === void 0 ? void 0 : response.message.toString()
                : false || (response === null || response === void 0 ? void 0 : response.message)
                    ? response === null || response === void 0 ? void 0 : response.message
                    : false || (exception === null || exception === void 0 ? void 0 : exception.message) || 'Unknown error';
        const stack = exception.stack || '';
        if (response.status) {
            response.status(status).json({
                error: {
                    message: message,
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: (request === null || request === void 0 ? void 0 : request.url) || '',
                    body: (request === null || request === void 0 ? void 0 : request.body) || '',
                    params: (request === null || request === void 0 ? void 0 : request.params) || '',
                    query: (request === null || request === void 0 ? void 0 : request.query) || '',
                    headers: (request === null || request === void 0 ? void 0 : request.headers) || '',
                    cookies: (request === null || request === void 0 ? void 0 : request.cookies) || '',
                    stack: stack,
                },
            });
        }
        else
            console.error({
                error: {
                    message: message,
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: (request === null || request === void 0 ? void 0 : request.url) || '',
                    body: (request === null || request === void 0 ? void 0 : request.body) || '',
                    params: (request === null || request === void 0 ? void 0 : request.params) || '',
                    query: (request === null || request === void 0 ? void 0 : request.query) || '',
                    headers: (request === null || request === void 0 ? void 0 : request.headers) || '',
                    cookies: (request === null || request === void 0 ? void 0 : request.cookies) || '',
                    stack: stack,
                },
            });
    }
};
AnyExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AnyExceptionFilter);
exports.AnyExceptionFilter = AnyExceptionFilter;
//# sourceMappingURL=HttpException.filter.js.map