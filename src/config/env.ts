// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

import dotenv from "dotenv";

dotenv.config(); // loads .env file variables into process.env

interface envConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}

// assing here what variables you set on .env file then use it in the app(or anaywhere)
export const envVars: envConfig = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
};
