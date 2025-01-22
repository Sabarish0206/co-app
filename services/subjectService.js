import * as subjectModel from '../models/subjectModel.js';

export const getAllSubjects = async () => {
    const subjects = await subjectModel.findAll();
    if(!subjects)
        throw new Error('No subject found in the table');
    return await subjectModel.findAll();
  };

export const createSubject = async (subject) => {

    if(!subject || !subject.name || !subject.code)
        throw new Error('name and code are required to create a subject');

    const existingSubject = await subjectModel.findSubjectByCode(subject.code);
    if(existingSubject)
        throw new Error(`Subject with code ${subject.code} already exists`);

    return await subjectModel.createSubject(subject);
}

export const getSubjectById = async (id) => {
    const subject = await subjectModel.findSubjectById(id);
    if(!subject)
        throw new Error(`No subject with id ${id}`);
    return await subjectModel.findSubjectById(id);
}

export const getSubjectByCode = async (code) => {
  const subject = await subjectModel.findSubjectByCode(code);
  if(!subject)
      throw new Error(`No subject with code ${code}`);
    return await subjectModel.findSubjectByCode(code);
}

export const deleteSubject = async (id) => {
    const subject = await subjectModel.findSubjectById(id);
    if(!subject)
        throw new Error(`No subject with id ${id}`);
    return await subjectModel.deleteSubject(id);
}

export const getSubjectByName = async (name) => {
    const subject = await subjectModel.findSubjectByName(name);
    if(!subject)
        throw new Error(`No subject with name ${name}`);
    return subject;
}
