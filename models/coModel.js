import prisma from "../config/db.js";

export const createCo = async (data) => {
    return await prisma.cO.create({ data });
};

export const findCObynameExamId = async (co,examId) => {
   return await prisma.cO.findUnique({ where: { name_examId: { name: co, examId } } }); 
    
}
export const getCoNameByCoId=async(coId) => {
    return await prisma.cO.findUnique({ where: { id: coId } });
    
}