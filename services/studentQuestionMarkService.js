import { createStudentsCoFromQuestions, getStudentsCoMarks } from "../services/studentCoMarkService.js";
import * as studentQuestionMarkModel from "../models/studentQuestionMarkModel.js";
import { getStudentsByYearSecAndDept } from "../services/studentService.js";
import { getQuestionsByExam } from "../services/questionPaperService.js";
import ExcelJS from 'exceljs'; // Ensure ExcelJS is imported correctly for handling Excel files

export const createStudentsQuestionsMark = async (studentsQuestionsMark) => {

  const studentsQuestionsMarks = []
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
  return { studentsQuestionsMarks, studentCoMarks };
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
  const uniqueCOs = [...new Set(questions.map(question => question.coId))];
 
  // Fetch existing student question marks
  const studentIds = students.map(student => student.id);
  const questionIds = questions.map(question => question.id);
  const existingMarks = await studentQuestionMarkModel.getStudentsQuestionsMark(studentIds, questionIds);

  const studentsCoMarks = await getStudentsCoMarks(studentIds,uniqueCOs);
  console.log("students co marks:",studentsCoMarks)

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
      questionNo: question.option ? question.no + question.option : question.no + "null",
    })),
    coMarks: studentsCoMarks
      .filter(coMark => coMark.studentId === student.id)
      .map(coMark => ({
        coId: coMark.coId,
        mark: coMark.mark,
        coTotal: coMark.coTotal
      }))
  }));
  console.log(studentsQuestionsMarks);
  return studentsQuestionsMarks;
};

export const insertBulkStudentsQuestionsMark = async (studentsQuestionsMark) => {
  const studentCoMarks = await createStudentsCoFromQuestions(studentsQuestionsMark);
  const studentsQuestionsMarks = studentsQuestionsMark.flatMap(student =>
    student?.isChanged ?? true
      ? student.answers
        .filter(({ acquiredMark }) => acquiredMark !== null && acquiredMark !== '')
        .map(({ questionId, acquiredMark }) => ({
          studentId: student.studentId,
          questionId,
          mark: parseInt(acquiredMark, 10)
        }))
      : []
  );
  console.log(studentsQuestionsMarks);
  const result = await studentQuestionMarkModel.upsertBulkStudentsQuestionsMark(studentsQuestionsMarks);
  console.log(result);
  return result, studentCoMarks;
}

export const getStudentsQuestionsMarkReport = async (studentsQuestionsMarks) => {

  const report = studentsQuestionsMarks.map(student => {
    const totalMarks = student.answers.reduce((acc, answer) => acc + (answer.acquiredMark || 0), 0);
    const coMarks = {};

    student.answers.forEach(answer => {
      const coId = answer.questionCo;
      if (!coMarks[coId]) {
        coMarks[coId] = 0;
      }
      coMarks[coId] += answer.acquiredMark || 0;
    });

    var studentReport = {
      name: student.name,
    };

    for (const answer of student.answers) {
      studentReport[answer.questionNo.replace("null", "")] = answer.acquiredMark;
    }

    studentReport["totalMark"] = totalMarks;

    let coIndex = 1;
    for (const co of Object.keys(coMarks)) {
      studentReport[`CO${coIndex}`] = coMarks[co];
      coIndex++;
    }

    return studentReport;
  });

  return report;
}

export const generateReport = async (exam, studentDetail) => {
  const studentsQuestionsMarks = await getStudentsQuestionsMark(exam, studentDetail);
  var reportData = await getStudentsQuestionsMarkReport(studentsQuestionsMarks);

  return reportData;
};


export const saveReportToFile = async (reportData, filePath) => {
  // Save the workbook to a file
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Student Questions Report');

  // Define columns
  if (reportData.length > 0) {
    worksheet.columns = Object.keys(reportData[0]).map(key => ({ header: key, key, width: 15 }));

    // Add rows to the worksheet
    reportData.forEach(student => {
      worksheet.addRow(student);
    });
  } else {
    console.warn('No data available to generate the report.');
  }
  
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};