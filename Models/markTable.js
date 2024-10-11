import pool from '../config/db.js';

class Marks {
    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS marks (
                reg_number INT NOT NULL,
                subject_code VARCHAR(100) NOT NULL,
                co1 INT,
                co2 INT,
                co3_half_1 INT,
                co3_half_2 INT,
                co4 INT,
                co5 INT,
                PRIMARY KEY (reg_number, subject_code),
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

    static async upsertMarks(marksData) {
        const { co1, co2, co3_half_1, co3_half_2, co4, co5, reg_number, subject_code } = marksData;
    
        const query = `
            INSERT INTO marks (reg_number, subject_code, co1, co2, co3_half_1, co3_half_2, co4, co5)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (reg_number, subject_code) DO UPDATE 
            SET 
                co1 = COALESCE(EXCLUDED.co1, marks.co1),
                co2 = COALESCE(EXCLUDED.co2, marks.co2),
                co3_half_1 = COALESCE(EXCLUDED.co3_half_1, marks.co3_half_1),
                co3_half_2 = COALESCE(EXCLUDED.co3_half_2, marks.co3_half_2),
                co4 = COALESCE(EXCLUDED.co4, marks.co4),
                co5 = COALESCE(EXCLUDED.co5, marks.co5)
            RETURNING *;
        `;
    
        try {
            const result = await pool.query(query, [reg_number, subject_code, co1, co2, co3_half_1, co3_half_2, co4, co5]);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting/updating values:', error);
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

    static async getCoByRegNumber(regNumber) {
        const query = `
        SELECT *
        FROM marks
        WHERE reg_number = $1;
    `;

    try {
        const result = await pool.query(query, [regNumber]);
        return result.rows;
    } catch (error) {
        console.error('Error retrieving marks:', error);
        throw new Error('Could not retrieve marks');
    }
    }
}

export default Marks;
