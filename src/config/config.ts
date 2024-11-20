import dotenv from "dotenv";

dotenv.config();

const Config = {
  serverPort: process.env.PORT as string,
  environment: process.env.NODE_ENV as string,
  mongo: {
    url: process.env.MONGO_URL as string,
  },
};



export default Config;
