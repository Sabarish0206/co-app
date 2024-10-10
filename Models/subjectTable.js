import pool from '../config/db.js';

class Subject {
    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS Subject (
                subject_id SERIAL PRIMARY KEY,
                subject_name VARCHAR(100) NOT NULL,
                subject_code VARCHAR(100) UNIQUE NOT NULL
            );
        `;
        try {
            await pool.query(query);
            console.log('Table "Subject" created successfully.');
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    static async insert(subject) {
        const { subject_name, subject_code } = subject;
        const query = `
            INSERT INTO Subject (subject_name, subject_code)
            VALUES ($1, $2)
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [subject_name, subject_code]);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting values:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const result = await pool.query('SELECT * FROM Subject');
            return result.rows;
        } catch (error) {
            console.error('Error fetching subjects:', error);
            throw error;
        }
    }
}

export default Subject;
