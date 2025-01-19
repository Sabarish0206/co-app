import prisma from "../config/db.js";

export const createCo = async (data) => {
    return await prisma.cO.create({ data });
};