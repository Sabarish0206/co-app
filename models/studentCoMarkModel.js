import prisma from "../config/db.js";

export const createStudentCoMark = async (data) => {
    console.log("Data from studentCoMarkModel:",{data});
    return await prisma.studentCOMark.create({ data });
}

export const getStudentCoMarkByStudentIdCoId = async (studentId, coId) => {
    return await prisma.studentCOMark.findUnique({ where: { studentId_coId: { studentId, coId } } });
}

export const updateStudentCoMark = async (data) => {
    return await prisma.studentCOMark.update({
        where: {
            studentId_coId: {
                studentId: data.studentId,
                coId: data.coId
            }
        },
        data
    });
}

export const uploadOrUpdateManyStudentCoMark = async (studentQuestionMarks) => {
    return await Promise.all(
        studentQuestionMarks.map((item) =>
          prisma.studentCOMark.upsert({
            where: { studentId_coId: { studentId: item.studentId, coId: item.coId } },
            update: { mark: item.mark },
            create: { ...item },
          })
        )
      );
}

export const getStudentsCoMarks = async (studentIds, coIds) => {
  return await prisma.studentCOMark.findMany({
    where: {
      studentId: { in: studentIds },
      coId: { in: coIds },
    },
  });
};
  
