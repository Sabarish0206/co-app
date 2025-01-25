import express from 'express';
import * as studentQuestionMarkController from '../controllers/studentQuestionMarkController.js';

const studentQuestionMarkRouter = express.Router();

// studentQuestionMarkRouter.get("/",studentQuestionMarkController.getAllStudentQuestionMarks);
studentQuestionMarkRouter.post("/create",studentQuestionMarkController.createStudentsQuestionsMark);

export default studentQuestionMarkRouter;