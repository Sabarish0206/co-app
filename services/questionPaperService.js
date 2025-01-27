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
    text: question.question,
    marks: parseInt(question.marks),
    option: question.option,
    subDivision: question.subDivision,
    pi: question.pi,
    bl: question.bl,
    coId: coId,
    no: parseInt(question.no),
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

  try{
    const { id: subjectId } = await getSubjectByCode(subjectCode);
    const {id: examId} = await findExamByNameSubjectIdYearSemester(subjectId, exam.examName, exam.year,exam.semester)

    const questions = await questionPaperModel.findQuestionByExamId(examId);

    const updatedQuestions = await Promise.all(
      questions.map(async (question) => {
        const coName = await coService.getCoNameByCoId(question.coId);
        return { ...question, coName };
      })
    );

    return updatedQuestions;
  } catch (error) {
  console.error('Error fetching questions:', error);
  throw error;
  }
  
};

export const getCoIdByQuestionId = async (questionId) => {
  const question = await questionPaperModel.findQuestionById(questionId);
  return question.co;
}
