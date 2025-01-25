import * as studentQuestionMarkService from '../services/studentQuestionMarkService.js';

export const createStudentsQuestionsMark = async (req, res) => {
    try {
        const studentsQuestionsMark = await studentQuestionMarkService.createStudentsQuestionsMark(req.body);
        res.status(201).json(studentsQuestionsMark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}