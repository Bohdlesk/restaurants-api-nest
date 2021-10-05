import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export const config = {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
