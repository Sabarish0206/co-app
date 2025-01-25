import prisma from "../config/db.js";

export const createQuestion = async (data) => {
    console.log("Data from questionPaperModel:",data);
    return await prisma.question.create({ data });
}

export const findQuestionByExamId = async (examId)=>{
    return await prisma.question.findMany({ where: { examId } });
}

export const findQuestionById = async (id)=>{
    return await prisma.question.findUnique({ where: { id } });
}
