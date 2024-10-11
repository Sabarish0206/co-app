import pool from '../config/db.js';
import XLSX from 'xlsx';
import fs from 'fs';

class Student{

    static async createStudentsTable() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Students (
                student_id SERIAL PRIMARY KEY,
                student_name VARCHAR(100) NOT NULL,
                reg_number BIGINT UNIQUE NOT NULL,
                student_section VARCHAR(50),
                student_year INT
            );
        `;
        try {
            await pool.query(createTableQuery);
            console.log('Students table created successfully');
        } catch (error) {
            console.error('Error creating Students table:', error);
        }
    }

    //insert single new student
    static async insert(student){
        const { student_name, reg_number, student_section,student_year } = student;
        try {
            const result = await pool.query(
                'INSERT INTO Students (student_name, reg_number, student_section, student_year) VALUES ($1, $2, $3, $4) RETURNING *',
                [student_name, reg_number, student_section, student_year]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting student:', error);
            throw new Error('Could not insert student');
        }
    }

    //insert students from excel file
    static async uploadFromExcel(filePath) {
        try {
            const workbook = XLSX.readFile(filePath);
            let totalRecordsInserted = 0;

            // Iterate through each sheet in the workbook
            for (const sheetName of workbook.SheetNames) {
                const sheet = workbook.Sheets[sheetName];

                const students = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const studentRecords = students.slice(1).map(row => ({
                    student_name: row[0],
                    reg_number: row[1],
                    student_section: row[2],
                    student_year: row[3],
                }));

                // Insert each student record into the database
                for (const student of studentRecords) {
                    await this.insert(student);
                    totalRecordsInserted++;
                }
            }

            return totalRecordsInserted;
        } catch (error) {
            console.error('Error processing Excel file:', error);
            throw new Error('Could not process Excel file');
        } finally {
            fs.unlinkSync(filePath); // Clean up the file after processing
        }
    }

    //get all students
    static async getAll(){
        try {
            const result = await pool.query('SELECT * FROM Students');
            return result.rows;
        } catch (error) {
            console.error('Error retrieving students:', error);
            throw new Error('Could not retrieve students');
        }
    }

    static async getStudentsByRegNumber(regNumber){
        try {
            const result = await pool.query('SELECT * FROM Students WHERE reg_number = $1', [regNumber]);
            return result.rows;
        } catch (error) {
            console.error('Error retrieving students by reg_number:', error);
            throw new Error('Could not retrieve students reg_number');
        }
    }

    static async getStudentsByYear(year){
        try {
            const result = await pool.query('SELECT * FROM Students WHERE student_year = $1', [year]);
            return result.rows;
        } catch (error) {
            console.error('Error retrieving students by year:', error);
            throw new Error('Could not retrieve students by year');
        }
    }

    static async getStudentsByYearAndSection(year,section) {
        try {
            const result = await pool.query('SELECT * FROM Students WHERE student_year = $1 AND student_section = $2', [year, section]);
            return result.rows;
        } catch (error) {
            console.error('Error retrieving students by section:', error);
            throw new Error('Could not retrieve students by section');
        }
    }

}

export default Student