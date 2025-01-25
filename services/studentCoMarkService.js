import { getCoIdByQuestionId } from "./questionPaperService.js";
import * as studentCoMarkModel from "../models/studentCoMarkModel.js";

export const createStudentsCoMarks = async (studentCoMarks) => {
  const studentCoMarksArray = await Promise.all(
    studentCoMarks.map((studentCoMark) => createStudentCoMark(studentCoMark))
  );
  return studentCoMarksArray;
};

export const createStudentCoMarks = async (data) => {
    const results = await Promise.all(data.map(async (studentCoMark) => {
        const result = await createStudentCoMark(studentCoMark);
        return result;
    }));
    return results;
}

export const createStudentCoMark = async (data) => {
    return data;
   // return await studentCoMarkModel.createStudentCoMark(data);
}

export const createStudentsCoFromQuestions = async (data) => {
    return Promise.all(data.map(createStudentCoFromQuestions));
}

export const createStudentCoFromQuestions = async (data) => {

    const cleanedStudentCoMark ={
        studentId: data.studentId,
        answers:await processStudentCoMark(data.answers)
    }

    const COs =[];
    const coMap = {};

   await cleanedStudentCoMark.answers.forEach((item) => {
    // group answers by coName ,acquiredMark and totalMark for each co
      const coKey = `co${item.questionCo}`; 
      if (!coMap[coKey]) {
        coMap[coKey] = {
          coName: coKey,
          acquiredMark: [],
          totalMark: [],
          questionId: item.questionID
        };
      }
      coMap[coKey].acquiredMark.push(item.acquiredMark || '0');
      coMap[coKey].totalMark.push(item.totalMark || '0');
    });
  
    Object.values(coMap).forEach(co => COs.push(co));

    //Calulate totalMark and acquiredMark for each co to student
    const studentCoMarksArray = await Promise.all(
      COs.map(async co => ({
          studentId: cleanedStudentCoMark.studentId,
          coId: co.questionId,
          totalMark: co.totalMark.reduce((acc, curr) => acc + Number(curr), 0),
          acquiredMark: co.acquiredMark.reduce((acc, curr) => acc + Number(curr), 0),
      }))
  );    

    console.log('studentCoMarksArray', studentCoMarksArray);
    return createStudentCoMarks(studentCoMarksArray);
    //return await createStudentCoMark(studentCoMarkArray);
}

export const processStudentCoMark = async(data) => {
    const seenQuestions = new Set();
    const removeNullQuestionMark = data.filter(question => question.acquiredMark !== null);

    //To remove duplicate questions eg 11A and 11B, if both have acquired mark empty remove 11B
    const removeDuplicateOptions = removeNullQuestionMark.filter((question) => {
        if (question.acquiredMark === '') {
          const baseQuestionNo = question.questionNo.match(/^\d+/)?.[0];
          if (baseQuestionNo) {
            if (seenQuestions.has(baseQuestionNo)) {
              return false;
            }
            seenQuestions.add(baseQuestionNo);
            return true;
          }
        }
        return true;
      });

    return removeDuplicateOptions;
}