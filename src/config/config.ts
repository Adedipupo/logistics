import dotenv from "dotenv";

dotenv.config();

const Config = {
  serverPort: process.env.PORT || '3000',
  environment: process.env.NODE_ENV || 'development',
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'logistics_db',
    logging: process.env.DB_LOGGING === 'true',
  },
  JWTHeader: {
    secret: process.env.JWT_SECRET || 'defaultSecret',
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    algorithm: process.env.JWT_ALGORITHM,
    expires: process.env.JWT_EXPIRES,
  },
};

export default Config;
