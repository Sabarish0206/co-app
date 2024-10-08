import pool from '../config/db.js';

class Student{
    static async create(student){
        const { student_name, reg_number, student_section,student_year } = student;
        const result = await pool.query(
            'INSERT INTO Students (student_name, enrollment_number) VALUES ($1, $2) RETURNING *',
            [student_name, enrollment_number]
        );
        return result.rows[0];
    }

    static async getAll(){
        const result = await pool.query('SELECT * FROM Students');
        return result.rows;
    }

}

export default Student