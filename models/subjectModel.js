import prisma from '../config/db.js';

export const findAll = async () => {
    return await prisma.subject.findMany();
  };

export const createSubject = async (data) => {
    return await prisma.subject.create({ data });
  };

export const findSubjectById = async (id) => {
    return await prisma.subject.findUnique({ where: { id } });
}

export const findSubjectByCode = async (code) => {
    return await prisma.subject.findUnique({ where: { code } });
}

export const deleteSubject = async (id) => {

  // await prisma.cOs.deleteMany({ where: { subjectId: id } });
  // await prisma.exam.deleteMany({ where: { subjectId: id } });
  // await prisma.question.deleteMany({ where: { subjectId: id } });

  return await prisma.subject.delete({ where: { id } });
}

export const findSubjectByName = async (name) => {
    return await prisma.subject.findFirst({ where: { name } });
}

