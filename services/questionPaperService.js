import { unlinkSync } from 'fs';
import { parseDocxTables } from './qp parser/parser.js';
import { getSubjectByCode, getSubjectByName } from './subjectService.js';
import { findExamByNameSubjectIdYearSemester } from './examService.js';
import * as questionPaperModel from '../models/questionPaperModel.js';
import * as coService from './coService.js';

export const parseQuestionPaper = async (filePath, subject, exam) => {
    const questionPaper = await parseDocxTables(filePath);
    unlinkSync(filePath);
    console.log(questionPaper);
    return questionPaper;
}

export const createQuestion = async (subjectId,question,examId) => {

  const co = Number(question.co);
  const coId = await coService.findCoIdorCreateNew(co,examId);

  const questionObject = {
    question: question.question,
    marks: question.marks,
    option: question.option,
    subDivision: question.subDivision,
    pi: question.pi,
    bl: question.bl,
    co: coId,
    no: question.no,
    subjectId: subjectId,
    examId: examId
  }

  return await questionPaperModel.createQuestion(questionObject);

}

export const createQuestions = async (subject,questionList,exam) => {
  const { id: subjectId } = await getSubjectByCode(subject);
  const { id: examId } = await findExamByNameSubjectIdYearSemester(subjectId, exam.name, exam.year, exam.semester);

  const questions = [];
  for(const question of questionList){
    const newQuestion = await createQuestion(subjectId, question, examId);
    questions.push(newQuestion);
  }
  return questions;
}

export const getQuestionsByExam = async (subjectCode,exam) =>{
  const { id: subjectId } = await getSubjectByCode(subjectCode);
  const {id: examId} = await findExamByNameSubjectIdYearSemester(subjectId, exam.examName, exam.year,exam.semester)

  const result = await questionPaperModel.findQuestionByExamId(examId);

  return result;
}
