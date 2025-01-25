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
