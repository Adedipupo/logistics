import { DataSource } from 'typeorm';
import Config from './config';
import { Auth } from '../v1/feat/auth/auth.entity';
import { Profile } from '../v1/feat/user/user-entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: Config.database.host,
  port: Config.database.port,
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.database,
  synchronize: false,
  logging: Config.database.logging,
  entities: [Auth,Profile],
  migrations: ['dist/config/migrations/*.js'],
  migrationsTableName: 'migrations_history',
});

export const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to PostgreSQL Successfully');
    console.log("█▀███████▀█");
    console.log("█ █▀▀▀▀▀█ █");
    console.log("Hello, logistics api is live !!!!");
  } catch (error:any) {
    console.error(`Error connecting to PostgreSQL: ${error.message}`);
    process.exit(1);
  }
};




