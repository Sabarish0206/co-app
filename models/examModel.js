import prisma from "../config/db.js";

export const createExam = async (data) => {
    return await prisma.exam.create({ data });
}

export const findExamsBySubjectId = async (subjectId) => {
    return await prisma.exam.findMany({ where: { subjectId } }); 
}

export const findAllExams = async () => {
    return await prisma.exam.findMany();
}

export const findExamByNameSubjectIdYear = async (subjectId, name, year) => {
    return await prisma.exam.findUnique({
        where: {
          subjectId_name_year: {
            name: name,
            subjectId: subjectId,
            year: year
          }
        }
      });
}