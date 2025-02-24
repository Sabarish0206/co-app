import * as examModel from '../models/examModel.js';
import * as subjectModel from '../models/subjectModel.js';

export const createExam = async (data) => {
    
    const subject = await subjectModel.findSubjectById(data.subjectId);
    if (!subject) {
        throw new Error(`No subject with id ${data.subjectId}`);
    }
    const existingExam = await examModel.findExamByNameSubjectIdYearSemester(data.subjectId, data.name, data.year, data.semester);
    if (existingExam) {
        throw new Error(`Exam for given subject, semester ${data.semester}, year ${data.year} already exists`);
    }
    return await examModel.createExam(data);
}

export const getAllExams = async () => {
    return await examModel.findAllExams();
}


export const findExamByNameSubjectIdYearSemester = async (subjectId, name, year,semester) => {
    return await examModel.findExamByNameSubjectIdYearSemester(subjectId, name, year, semester);
}

export const getUniqueExamNames = async () => {
    const exams = await examModel.findAllExams();
    const examNames = exams.map(exam => exam.name);
    const uniqueExamNames = [...new Set(examNames)];

    
    return uniqueExamNames;
}
