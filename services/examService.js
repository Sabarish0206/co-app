import * as examModel from '../models/examModel.js';
import * as subjectModel from '../models/subjectModel.js';

export const createExam = async (data) => {
    
    const subject = await subjectModel.findSubjectById(data.subjectId);
    if (!subject) {
        throw new Error(`No subject with id ${data.subjectId}`);
    }
    const existingExam = await examModel.findExamBySubjectIdSemesterYear(data.subjectId, data.semester, data.year);
    if (existingExam) {
        throw new Error(`Exam for given subject, semester ${data.semester}, year ${data.year} already exists`);
    }
    return await examModel.createExam(data);
}

export const getAllExams = async () => {
    return await examModel.findAllExams();
}


export const findExamBySubjectIdSemesterYear = async (subjectId, semester, year) => {
    return await examModel.findExamsBySubjectId(subjectId, semester, year);
}
