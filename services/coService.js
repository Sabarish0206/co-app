import * as coModel from "../models/coModel.js";

export const createCos = async (data) => {

    const co = await coModel.createCo({ data });

    console.log(data, 'data');

        // return await prisma.co.create({ data }); 
    };