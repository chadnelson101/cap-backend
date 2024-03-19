import mysql from 'mysql2'
import {config} from 'dotenv';
config()

const pool = mysql.createPool({
    host: process.env.db_HOST,
    user: process.env.db_USER,
    password: process.env.db_PASSWORD,
    database: process.env.db_DATABASE
}).promise();

export {pool}