import * as examModel from '../models/examModel.js';
import * as subjectModel from '../models/subjectModel.js';

export const createExam = async (data) => {
    
    const subject = await subjectModel.findSubjectById(data.subjectId);
    if (!subject) {
        throw new Error(`No subject with id ${data.subjectId}`);
    }
    const existingExam = await examModel.findExamByNameSubjectIdYear(data.subjectId, data.name, data.year);
    if (existingExam) {
        throw new Error(`Exam for given subject, semester ${data.semester}, year ${data.year} already exists`);
    }
    return await examModel.createExam(data);
}

export const getAllExams = async () => {
    return await examModel.findAllExams();
}


export const findExamByNameSubjectIdYear = async (subjectId, name, year) => {
    return await examModel.findExamByNameSubjectIdYear(subjectId, name, year);
}

// export const findExamIdByNameSemes
