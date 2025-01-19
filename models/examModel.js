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

export const findExamBySubjectIdSemesterYear = async (subjectId, semester, year) => {
    return await prisma.exam.findUnique({
        where: {
          subjectId_semester_year: {
            subjectId: subjectId,
            semester: semester,
            year: year
          }
        }
      });
}