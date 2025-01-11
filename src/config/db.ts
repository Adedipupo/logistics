import { DataSource } from 'typeorm';
import Config from './config';
// import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: Config.database.host,
  port: Config.database.port,
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.database,
  synchronize: Config.database.synchronize,
  logging: Config.database.logging,
  // entities: [User], // Add all entities here
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




