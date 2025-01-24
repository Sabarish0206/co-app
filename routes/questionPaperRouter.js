import express from 'express';
import * as questionPaperController from '../controllers/questionPaperController.js';

const questionPaperRouter = express.Router();


questionPaperRouter.get("/",questionPaperController.getAllQuestions);
questionPaperRouter.post("/upload",questionPaperController.uploadQuestionPaper);
questionPaperRouter.post("/create",questionPaperController.createQuestions);
questionPaperRouter.get("/examQuestions/:subjectCode/:examName/:examYear/:semester",questionPaperController.getQuestionsByExam);



export default questionPaperRouter