import { createStudentsCoFromQuestions } from "../services/studentCoMarkService.js";
import * as studentQuestionMarkModel from "../models/studentQuestionMarkModel.js";
import {getStudentsByYearSecAndDept} from "../services/studentService.js";
import {getQuestionsByExam} from "../services/questionPaperService.js";

export const createStudentsQuestionsMark = async (studentsQuestionsMark) => {

const studentsQuestionsMarks =[]
const studentCoMarks = await createStudentsCoFromQuestions(studentsQuestionsMark);

for (const studentQuestionsMark of studentsQuestionsMark) {
    const payload = {
      studentId: studentQuestionsMark.studentId,
      answers: studentQuestionsMark.answers,
    };
    try {
        const response = await createStudentQuestionsMark(payload);
        studentsQuestionsMarks.push(response); 
      } catch (error) {
        console.error(`Error processing student ID ${studentQuestionsMark.studentId}:`, error);
      }
    }
    console.log(studentsQuestionsMarks);
    return {studentsQuestionsMarks, studentCoMarks};
};

export const createStudentQuestionsMark = async (studentQuestionsMarkData) => {

    const studentQuestionsMark = [];

    const payload = {
        studentId: studentQuestionsMarkData.studentId,
        answers: studentQuestionsMarkData.answers
          .filter((answer) => answer.acquiredMark !== '' && answer.acquiredMark !== null) // Exclude empty and null acquiredMarks
          .map((answer) => ({
            questionId: answer.questionId,
            acquiredMarks: answer.acquiredMark,
          })),
      };

      const studentQuestionMarks = payload.answers.reduce((acc, answer) => {
        acc.push({
          studentId: payload.studentId,
          questionId: answer.questionId,
          mark: parseInt(answer.acquiredMarks),
        });
        return acc;
      }, []);
  
      if (payload.answers.length === 0) return [];

       
        for (const studentQuestionMark of studentQuestionMarks) {
          try {
            const result = await createStudentQuestionMark(studentQuestionMark);
            studentQuestionsMark.push(result);
            console.log(studentQuestionMark);
          } catch (error) {
            console.error('Error creating student question mark:', error);
            throw error;
          }
        }
        return studentQuestionsMark;
    };

export const createStudentQuestionMark = async (data) => {  
    const existingStudentQuestionMark = await studentQuestionMarkModel.getStudentQuestionMarksByStudentIdQuestionId(data.studentId, data.questionId);
    if (existingStudentQuestionMark) {
      return await studentQuestionMarkModel.updateStudentQuestionMark(data);
    }
    return await studentQuestionMarkModel.createStudentQuestionMark(data);
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (studentId, questionId) => {
    return await studentQuestionMarkModel.getStudentQuestionMarksByStudentIdQuestionId(studentId, questionId);
}

export const getStudentsQuestionsMark = async (exam, studentDetail) => {
  const students = await getStudentsByYearSecAndDept(studentDetail.year, studentDetail.sec, studentDetail.dept);
  const questions = await getQuestionsByExam(exam.subjectCode, exam);

  // Fetch existing student question marks
  const studentIds = students.map(student => student.id);
  const questionIds = questions.map(question => question.id);
  const existingMarks = await studentQuestionMarkModel.getStudentsQuestionsMark(studentIds, questionIds);

  // Convert existing marks into a lookup map
  const marksMap = new Map();
  existingMarks.forEach(({ studentId, questionId, mark }) => {
    marksMap.set(`${studentId}-${questionId}`, mark);
  });

  // Map students with their answers and fill in existing marks if available
  const studentsQuestionsMarks = students.map(student => ({
    studentId: student.id,
    name: student.name,
    answers: questions.map(question => ({
      questionId: question.id,
      acquiredMark: marksMap.get(`${student.id}-${question.id}`) || '', // Use existing mark if available
      totalMark: question.marks,
      questionCo: question.coId,
      questionNo: question.option ? question.no+question.option : question.no+"null",
    }))
  }));

  return studentsQuestionsMarks;
};
