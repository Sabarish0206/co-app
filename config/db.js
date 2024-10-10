import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Create a PostgreSQL pool
const pool = new Pool({
    connectionString: `postgresql://postgres.khftedpajvpbjfxtticn:${process.env.POSTGRESQL_PASSWORD}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 2000  
})

export default pool;