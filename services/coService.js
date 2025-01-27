import * as coModel from "../models/coModel.js";

export const createCO = async (data) => {
    return await coModel.createCo(data);
};

export const getAllCOs = async () => {
    return await coModel.findAllCOs();
};

export const getCOId = async (co,subjectId,examId) => {
    const data = await coModel.findCObynameExamId(co,examId);
    return data.id;
}

export const findCoIdorCreateNew = async (co,examId) => {
    const existingCO = await coModel.findCObynameExamId(co,examId);
    if (existingCO) {
      return existingCO.id;
    } else {
      const newCO = {
        name: co,
        examId: examId
      }
      const { id: newCOId } = await coModel.createCo(newCO);
      return newCOId;
    }
  };

  export const getCoNameByCoId = async (coId) => {
    const co = await coModel.getCoNameByCoId(coId);
    return co.name;
  }