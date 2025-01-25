import prisma from "../config/db.js";

export const createStudentQuestionMark = async (data) => {
    return await prisma.studentQuestionMark.create({ data });
}

export const getStudentQuestionMarksByStudentIdQuestionId = async (studentId, questionId) => {
    return await prisma.studentQuestionMark.findMany({ where: { studentId, questionId } });
}