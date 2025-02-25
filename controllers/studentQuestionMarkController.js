import * as studentQuestionMarkService from '../services/studentQuestionMarkService.js';

export const createStudentsQuestionsMark = async (req, res) => {
    try {
        const studentsQuestionsMark = await studentQuestionMarkService.insertBulkStudentsQuestionsMark(req.body);
        res.status(201).json(studentsQuestionsMark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (req, res) => {
    try {
        const studentQuestionMarks = await studentQuestionMarkService.getStudentQuestionMarksByStudentIdQuestionId(req.params.studentId, req.params.questionId);
        res.status(200).json(studentQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getStudentsQuestionsMark = async (req, res) => {
    const {exam,studentDetail}=req.body;
    try {
        const studentsQuestionsMark = await studentQuestionMarkService.getStudentsQuestionsMark(exam,studentDetail);
        res.status(200).json(studentsQuestionsMark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const downloadReport = async (req, res) => {
    console.log(req.body);
    const {exam,studentDetail}=req.body;
    try {
        const reportData = await studentQuestionMarkService.generateReport(exam,studentDetail);
        const filePath = 'student_questions_report.xlsx';
        const reportFilePath = await studentQuestionMarkService.saveReportToFile(reportData, filePath);
        res.download(reportFilePath, filePath, (err) => {
            if (err) {
                res.status(500).json({ error: 'Error downloading the report' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getReport = async (req, res) => {
    const {exam,studentDetail}=req.body;
    try {
        res.status(200).json(
            await studentQuestionMarkService.generateReport(exam,studentDetail)
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

