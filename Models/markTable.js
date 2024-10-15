import pool from '../config/db.js';
import Subject from './subjectTable.js';
import Student from './studentTable.js';

class Marks {
    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS marks (
                reg_number BIGINT NOT NULL,
                subject_code VARCHAR(100) NOT NULL,
                co1 FLOAT,
                co2 FLOAT,
                co3_half_1 FLOAT,
                co3_half_2 FLOAT,
                co4 FLOAT,
                co5 FLOAT,
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
            const student = await Student.getStudentsByRegNumber(reg_number);
            const subject = await Subject.getByCode(subject_code);
            if(subject.length === 0 || student.length === 0) {
                throw new Error('Student or subject not matched');
            }
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

    static async getCoBySubjectCode(subjectCode) {
        const query = `
        SELECT *
        FROM marks
        WHERE subject_code = $1;
    `;

    try {    
        const result = await pool.query(query, [subjectCode]);
        return result.rows;
    } catch (error) {
        console.error('Error retrieving marks:', error);
        throw new Error('Could not retrieve marks');
    }
    }


}

export default Marks;
