import { createStudentsCoFromQuestions } from "../services/studentCoMarkService.js";
import * as studentQuestionMarkModel from "../models/studentQuestionMarkModel.js";

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
            questionId: answer.questionID,
            acquiredMarks: answer.acquiredMark,
          })),
      };

      const studentQuestionMarks = payload.answers.reduce((acc, answer) => {
        acc.push({
          studentId: payload.studentId,
          questionId: answer.questionId,
          acquiredMarks: answer.acquiredMarks,
        });
        return acc;
      }, []);
  
      if (payload.answers.length === 0) return [];

       
        for (const studentQuestionMark of studentQuestionMarks) {
          try {
            const result = await createStudentQuestionMark(studentQuestionMark);
            studentQuestionsMark.push(result);
          // studentQuestionsMark.push(result);
           console.log(studentQuestionMark);
          } catch (error) {
            console.error('Error creating student question mark:', error);
            throw error;
          }
        }
        return studentQuestionsMark;
    };

export const createStudentQuestionMark = async (data) => {  
    return data;
    //return await studentQuestionMarkModel.createStudentQuestionMark(data);
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (studentId, questionId) => {
    return await studentQuestionMarkModel.getStudentQuestionMarksByStudentIdQuestionId(studentId, questionId);
}