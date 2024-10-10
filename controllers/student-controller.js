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