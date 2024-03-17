import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FileUpload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Express.Multer.File => {
    const request = ctx.switchToHttp().getRequest();
    return request.file;
  },
);
