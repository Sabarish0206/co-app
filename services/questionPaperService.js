import { unlinkSync } from 'fs';
import { parseDocxTables } from './qp parser/parser.js';
import { getSubjectByCode } from './subjectService.js';
import { findExamByNameSubjectIdYear } from './examService.js';
import * as questionPaperModel from '../models/questionPaperModel.js';
import * as coService from './coService.js';

export const parseQuestionPaper = async (filePath, subject, exam) => {
    const questionPaper = await parseDocxTables(filePath);
    unlinkSync(filePath);
    console.log(questionPaper);
    return questionPaper;
}

export const createQuestion = async (subject,question, exam) => {

  console.log(subject);
  const { id: subjectId } = await getSubjectByCode(subject);
  const { id: examId } = await findExamByNameSubjectIdYear(subjectId, exam.name, exam.year);

  const co = Number(question.co);
  const coId = await coService.findCoIdorCreateNew(co,examId);

  const questionObject = {
    question: question.question,
    marks: question.marks,
    option: question.option,
    subDivision: question.subDivision,
    pi: question.pi,
    bl: question.bi,
    co: coId,
    no: question.no,
    subjectId: subjectId,
    examId: examId
  }

  return await questionPaperModel.createQuestion(questionObject);

}

export const createQuestions = async (subject,questionList,exam) => {
  const questions = [];
  for(const question of questionList){
    const newQuestion = await createQuestion(subject, question, exam);
    questions.push(newQuestion);
  }
  return questions;
}
