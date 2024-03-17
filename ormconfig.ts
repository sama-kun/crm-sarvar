import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
dotenv.config();
console.log(
  `Uses postgres database ${process.env.POSTGRES_NAME} at ${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`,
);

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432') || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  autoLoadEntities: true,
  entities: ['src/database/entities/**/*.entity{.ts,.js}'],
	synchronize: true,
  migrationsRun: process.env.NODE_ENV !== 'development',
	migrations: ['src/database/migrations/**/*.ts'],
	subscribers: ['src/database/subscribers/**/*.subscriber{.ts,.js}'],
	cli: {
		entitiesDir: 'src/modules/',
		migrationsDir: 'src/database/migrations/',
		seedsDir: 'src/database/seeds/',
	},
  ssl: process.env.DB_SSl || false,
  // extra: {
  //   ssl: {
  //     ca: fs.readFileSync('./cer_ksi.crt'),
  //   },
  // },
} as DataSourceOptions);