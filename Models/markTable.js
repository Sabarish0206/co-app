import pool from '../config/db.js';

class Marks {
    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS marks (
                co1 INT NOT NULL,
                co2 INT NOT NULL,
                co3 INT NOT NULL,
                co4 INT NOT NULL,
                co5 INT NOT NULL,
                reg_number INT PRIMARY KEY,
                subject_code VARCHAR(100) NOT NULL,
                FOREIGN KEY (reg_number) REFERENCES Students(reg_number) ON DELETE CASCADE,
                FOREIGN KEY (subject_code) REFERENCES subject(subject_code) ON DELETE CASCADE
            );
        `;
        try {
            await pool.query(query);
            console.log('Table "marks" created successfully.');
        } catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    }

    static async insert(marksData) {
        const { co1, co2, co3, co4, co5, reg_number, subject_code } = marksData;
        const query = `
            INSERT INTO marks (co1, co2, co3, co4, co5, reg_number, subject_code)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        try {
            const result = await pool.query(query, [co1, co2, co3, co4, co5, reg_number, subject_code]);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting values:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const result = await pool.query('SELECT * FROM marks');
            return result.rows;
        } catch (error) {
            console.error('Error fetching marks:', error);
            throw error;
        }
    }
}

export default Marks;
