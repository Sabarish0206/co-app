import pkg from 'pg';
const { Pool } = pkg;

// Create a PostgreSQL pool
const pool = new Pool({
    connectionString: 'postgresql://postgres.xtwhfksurddqencrmhtl:Student@info12@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: {
        rejectUnauthorized: false // Required for Heroku
    },
    connectionTimeoutMillis: 2000  
})

export default pool;