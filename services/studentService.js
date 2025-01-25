import * as studentModel from '../models/studentModel.js';
import xlsx from 'xlsx';
import { unlinkSync } from 'fs';

export const parseExcelFile = async (filePath) => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const students = xlsx.utils.sheet_to_json(sheet);

    // Validate required fields
    const validStudents = students.map((student) => {
      if (!student.Name || !student.Roll_Number || !student.Year || !student.Section) {
        throw new Error('Missing required fields in Excel file');
      }
    
      //Want to write logic to handle department in Excel file

      return {
        name: student.Name.trim(),
        roll_number: student.Roll_Number,
        year: student.Year.trim(),
        sec: student.Section.trim(),
      };
    });

    // Delete the file after processing
    unlinkSync(filePath);

    return validStudents;
  } catch (error) {
    // Delete the file in case of an error
    unlinkSync(filePath);
    throw error;
  }
};

export const addStudents = async (students) => {
  try {
    for (const student of students) {
      await studentModel.upsertStudent(student);
    }
  } catch (error) {
    throw new Error(`Error adding students to the database: ${error.message}`);
  }
};

export const getAllStudents = async () => {
  try {
    const students = await studentModel.findAll();
    if (!students || students.length === 0) {
      throw new Error('No students found in the database');
    }
    return students;;
  } catch (error) {
    throw new Error(`Error fetching students from the database: ${error.message}`);
  }
}

export const getStudentsByYearAndSec = async (year, sec) => {
  try {
    const students = await studentModel.findStudentsByYearAndSec(year, sec);
    if (!students || students.length === 0) {
      throw new Error(`No students found in the database with year ${year} and section ${sec}`);
    }
    return students;
  } catch (error) {
    throw new Error(`Error fetching students from the database: ${error.message}`);
  }
}
 export const getStudentsByYearSecAndDept = async (year, sec, dept) => {
  try {
    year = year.toUpperCase();
    sec = sec.toUpperCase();
    dept = dept.toUpperCase();
    const students = await studentModel.findStudentsByYearSecAndDept(year, sec, dept);
    if (!students || students.length === 0) {
      throw new Error(`No students found in the database with year ${year}, section ${sec}, and department ${dept}`);
    }
    return students;
  } catch (error) {
    throw new Error(`Error fetching students from the database: ${error.message}`);
  }
}

