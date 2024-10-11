import  Student  from '../Models/studentTable.js';
import multer from 'multer';


export const upload = multer({ dest: './uploads' });
export const uploadStudentsFromExcel = async (req, res) => {
    await Student.createStudentsTable();
    try {
        const filePath = req.file.path; // Get the file path from the uploaded file
        const numberOfRecords = await Student.uploadFromExcel(filePath);
        res.status(200).json({ message: `${numberOfRecords} students uploaded successfully` });
    } catch (error) {
        console.error('Error in uploadStudentsFromExcel:', error);
        res.status(500).json({ error: 'Could not upload students' });
    }
}

export const insertStudent = async (req, res) => {
    try {
        const student = req.body;
        const insertedStudent = await Student.insert(student);
        res.status(200).json(insertedStudent);
    } catch (error) {
        console.error('Error in insertStudent:', error);
        res.status(500).json({ error: 'Could not insert student' });
    }
}

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAll();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getAllStudents:', error);
        res.status(500).json({ error: 'Could not get students' });
    }
}

export const getStudentByRegNumber = async (req, res) => {
    try {
        const regNumber = req.query.regNumber;
        const student = await Student.getStudentsByRegNumber(regNumber);
        res.status(200).json(student);
    } catch (error) {
        console.error('Error in getStudentByRegNumber:', error);
        res.status(500).json({ error: 'Could not get student' });
    }
}

export const getStudentsByYear = async (req, res) => {
    try {
        const year = req.query.year;
        const students = await Student.getStudentsByYear(year);
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getStudentsByYear:', error);
        res.status(500).json({ error: 'Could not get students' });
    }
}

export const getStudentsByYearAndSection = async (req, res) => {
    try {
        const year = req.query.year;
        const section = req.query.section;
        const students = await Student.getStudentsByYearAndSection(year, section);
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getStudentsByYearAndSection:', error);
        res.status(500).json({ error: 'Could not get students' });
    }
}

export const getStudentDetails = async (req, res) => {

    try {
        const { regNumber, year, section } = req.query;
        if (regNumber) {
            const student = await getStudentByRegNumber(req, res);
            res.status(200).json(student);
        }else if (year && section) {
            const students = await getStudentsByYearAndSection(req, res);
            res.status(200).json(students);
        } else if (year) {
            const students = await getStudentsByYear(req, res);
            res.status(200).json(students);
        }  else {
            const students = await getAllStudents(req, res);
            res.status(200).json(students);
        }
        }

    catch (error) {
        console.error('Error in getStudentDetails:', error);
        res.status(500).json({ error: 'Could not get student details' });
    }
}
