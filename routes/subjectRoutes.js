import express from 'express';
import * as subjectController from '../controllers/subjectController.js';

const subjectRouter =  express.Router();

subjectRouter.get("/",subjectController.getAllSubjects);
subjectRouter.get("/:code",subjectController.getSubjectByCode);
subjectRouter.post("/",subjectController.createSubject);
subjectRouter.delete("/",subjectController.deleteSubject);

export default subjectRouter; 