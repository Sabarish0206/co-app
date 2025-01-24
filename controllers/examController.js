import * as examService from '../services/examService.js';

export const getAllExams = async (req, res) => {
    try {
        const exams = await examService.getAllExams();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

export const createExam = async (req, res) => {
    try {
        const exam = await examService.createExam(req.body);
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getExamByNameSubjectIdYearSemester = async (req, res) => {
    try {
        const exam = await examService.findExamByNameSubjectIdYearSemester(req.params.subjectId, req.params.year, req.params.name, req.params.semester);
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
}
};
export const getUniqueExamNames = async (req, res) => {
    try {
        const uniqueExamNames = await examService.getUniqueExamNames();
        res.status(200).json(uniqueExamNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
