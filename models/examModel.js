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

export const findExamByNameSubjectIdYearSemester = async (subjectId, name, year, semester) => {
    return await prisma.exam.findUnique({
        where: {
          subjectId_name_year_semester: {
            subjectId: subjectId,
            name: name,
            year: year,
            semester: semester
          }
        }
      });
}
