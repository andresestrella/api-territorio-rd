import { Pool } from 'pg';
import dotenv from 'dotenv';

//initialize a Pool object with the environment variables from the .dotenv file
dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_DATABASE || 'territorios',
    password: process.env.DB_PASS || '1234',
    port: Number(process.env.DB_PORT) || 5432,
    // connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/territorios',
    ssl: process.env.DATABASE_URL ? true : false
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

