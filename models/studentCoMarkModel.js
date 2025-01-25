import prisma from "../config/db.js";

export const createStudentCoMark = async (data) => {
    return await prisma.studentCOMark.create({ data });
}