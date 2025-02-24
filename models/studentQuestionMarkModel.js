import prisma from "../config/db.js";

export const createStudentQuestionMark = async (data) => {
    console.log("Data from studentQuestionMarkModel:",{data});
    return await prisma.studentQuestionMark.create({ data });
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (studentId, questionId) => {
    return await prisma.studentQuestionMark.findUnique({
        where: {
            studentId_questionId: {
                studentId,
                questionId
            }
        }
    });
}

export const updateStudentQuestionMark = async (data) => {
    return await prisma.studentQuestionMark.update({
        where: {
            studentId_questionId: {
                studentId: data.studentId,
                questionId: data.questionId
            }
        },
        data
    });
}

export const getStudentsQuestionsMark = async (studentIds,questionIds) => {
    const data = await prisma.studentQuestionMark.findMany({
        where: {
          studentId: { in: studentIds },
          questionId: { in: questionIds },
        },
        include: {
          student: {
            select: { id: true, name: true }, // Include student details
          },
          question: {
            select: { 
              id: true, 
              no: true, 
              option: true, 
              marks: true, 
              coId: true 
            }, // Include question details
          },
        },
      });
      return data;
};

export const upsertBulkStudentsQuestionsMark = async (studentQuestionMarks) => {
  return await Promise.all(
    studentQuestionMarks.map((item) =>
      prisma.studentQuestionMark.upsert({
        where: { studentId_questionId: { studentId: item.studentId, questionId: item.questionId } },
        update: { marks: item.marks },
        create: { ...item },
      })
    )
  );
};
