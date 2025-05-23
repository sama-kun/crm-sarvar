import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@/modules/users/users.module";
import { AuthModule } from "@/modules/auth/auth.module";
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from "@/common/filters/HttpException.filter";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "@/common/interceptors/rest-response.interceptor";
import { LoggingInterceptor } from "@/common/interceptors/logging.interceptor";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import * as fs from "fs-extra";
import { ProductModule } from "@/modules/product/product.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { OrderModule } from "@/modules/order/order.module";
import { BasketModule } from "@/modules/basket/basket.module";
import { CloudinaryModule } from "@/modules/cloudinary/cloudinary.module";
import { PaymentHistoryModule } from "@/modules/paymentHistory/paymentHistory.module";
import { ProfileModule } from "@/modules/profile/profile.module";
// import { DeliverymanModule } from "@/modules/deliveryman/deliveryman.module";
dotenv.config();

console.log(process.env.POSTGRES_PORT);

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    CloudinaryModule,
    PaymentHistoryModule,
    OrderModule,
    BasketModule,
    ProfileModule,
    // DeliverymanModule,
    // XxxModule,
    ConfigModule.forRoot({
      envFilePath: ".env", // Specify the location of your .env file here
      isGlobal: true, // Makes the ConfigModule globally available
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: "postgres", // Specify your DB type, e.g., 'postgres', 'mysql'
        // url: config.get('DATABASE_URL'), // Get the DB URL from config
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        // port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        entities: [
          __dirname + "/../../src/database/entities/*.entity{.ts,.js}",
        ],
        subscribers: [
          __dirname + "/../../src/database/subscribers/*.subscriber{.ts,.js}",
        ],
        synchronize: true, // Be careful with this in production!
        autoLoadEntities: true,
        logging: false,
        migrations: [__dirname + "/../../src/database/migrations/*{.ts,.js}"],
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: parseInt(process.env.POSTGRES_PORT),
    //   port: process.env.POSTGRES_PORT,
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_NAME,
    //   entities: [__dirname + '/../../src/database/entities/*.entity{.ts,.js}'],
    //   subscribers: [
    //     __dirname + '/../../src/database/subscribers/*.subscriber{.ts,.js}',
    //   ],
    //   synchronize: true,
    //   // migrationsRun: process.env.NODE_ENV !== 'development',
    //   autoLoadEntities: true,
    //   logging: false,
    //   migrations: [__dirname + '/../../src/database/migrations/*{.ts,.js}'],
    //   ssl: Boolean(process.env.DB_SSl) || false,
    //   // extra: {
    //   //   ssl: {
    //   //     ca: fs.readFileSync('./cer_ksi.crt'),
    //   //   },
    //   // },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: SentryExceptionFilter,
    // },
  ],
})
export class AppModule {}
