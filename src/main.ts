import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from './common/filters/HttpException.filter';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/rest-response.interceptor';
import RateLimit from 'express-rate-limit';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import swaggerInit from '@/swagger';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as Sentry from '@sentry/node';

async function bootstrap() {
  const logger = new Logger('KSI');
  logger.log(`Application [KSI] is starting...` + process.env.CHROME_PATH);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  swaggerInit(app);
  app.enableCors();
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );
  app.use(
    RateLimit({
      windowMs: 5 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      handler: (request, response) => {
        return response.status(501).send({
          error: {
            message: 'Too many requests. Please keep calm and get slow down.',
            details: `More then 100 requests in last minute from your IP`,
          },
        });
      },
    }),
  );

  console.log(`
  KSI_BACKEND ver.1.0 by Samgar Seriknur @lieproger
  Started at lo http://localhost:${process.env.PORT}
  NODE_ENV=local
  `);
  // swaggerInit(app);
}
bootstrap().catch((e) => {
  throw new Error(e);
});
