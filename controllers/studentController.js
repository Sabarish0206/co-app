import multer from 'multer';
import * as studentService from '../services/studentService.js';

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const uploadStudents = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const students = await studentService.parseExcelFile(req.file.path);
      await studentService.addStudents(students);
      res.status(200).json({ message: 'Students uploaded successfully', students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading students', error: error.message });
    }
  },
];

export const getStudentsByYearAndSec = async (req, res) => {
  try {
    const students = await studentService.getStudentsByYearAndSec(req.params.year, req.params.sec);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};
export const getStudentsByYearSecAndDept = async (req, res) => {
  try {
    const students = await studentService.getStudentsByYearSecAndDept(req.params.year, req.params.sec, req.params.dept);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}