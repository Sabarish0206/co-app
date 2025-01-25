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
