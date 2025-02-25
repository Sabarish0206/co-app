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
    const existingStudentCoMark = await studentCoMarkModel.getStudentCoMarkByStudentIdCoId(data.studentId, data.coId);
    if (existingStudentCoMark) {
      return await studentCoMarkModel.updateStudentCoMark(data);
    }
    return await studentCoMarkModel.createStudentCoMark(data);
}

export const createStudentsCoFromQuestions = async (data) => {
    const studentCoFromQuestions = await Promise.all(data.map(createStudentCoFromQuestions));
    const studentCoFromQuestionsArray = studentCoFromQuestions.flat();
    console.log('studentCoFromQuestionsArray', studentCoFromQuestionsArray);
    return studentCoMarkModel.uploadOrUpdateManyStudentCoMark(studentCoFromQuestionsArray);
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
      const coKey = item.questionCo; 
      if (!coMap[coKey]) {
        coMap[coKey] = {
          coId: coKey,
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
          coId: co.coId,
          coTotal: co.totalMark.reduce((acc, curr) => acc + Number(curr), 0),
          mark: co.acquiredMark.reduce((acc, curr) => acc + Number(curr), 0),
      }))
  );    

    console.log('studentCoMarksArray', studentCoMarksArray);
    return studentCoMarksArray;
}

export const processStudentCoMark = async (data) => {
  const seenQuestions = new Set();
  const removeNullQuestionMark = data.filter(question => question.acquiredMark !== null);

  // To remove 11B if both 11A and 11B have empty acquiredMark, keep only 11A
  const removeDuplicateOptions = removeNullQuestionMark.filter((question) => {
      if (question.acquiredMark === '') {  // Check if acquiredMark is empty
          const baseQuestionNo = question.questionNo.toString().match(/^\d+/)?.[0];  // Extract the base question number (e.g., 11)
          const suffix = question.questionNo.toString().replace(baseQuestionNo, '');  // Get the suffix (e.g., A, B)

          if (baseQuestionNo) {
              if (seenQuestions.has(baseQuestionNo)) {
                  if (suffix.toUpperCase() !== 'A') {
                      return false; // Remove this option (e.g., 11B, 11C)
                  }
              } else {
                  seenQuestions.add(baseQuestionNo);
                  return true; // Keep the first occurrence (e.g., 11A)
              }
          }
      }
      return true; // Keep questions that don't have an empty acquiredMark
  });

  return removeDuplicateOptions;
}

export const getStudentsCoMarks = async (studentIds, coIds) => {
  const studentCoMarks = await studentCoMarkModel.getStudentsCoMarks(studentIds,coIds);
  return studentCoMarks;
};
