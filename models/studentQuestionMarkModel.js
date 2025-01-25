import prisma from "../config/db.js";

export const createStudentQuestionMark = async (data) => {
    return await prisma.studentQuestionMark.create({ data });
}