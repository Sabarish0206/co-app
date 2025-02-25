import express from 'express';
import * as studentQuestionMarkController from '../controllers/studentQuestionMarkController.js';

const studentQuestionMarkRouter = express.Router();

// studentQuestionMarkRouter.get("/",studentQuestionMarkController.getAllStudentQuestionMarks);
studentQuestionMarkRouter.post("/create",studentQuestionMarkController.createStudentsQuestionsMark);
studentQuestionMarkRouter.get("/:studentId/:questionId",studentQuestionMarkController.getStudentQuestionMarksByStudentIdQuestionId);
studentQuestionMarkRouter.post("/getStudentsQuestionsMark",studentQuestionMarkController.getStudentsQuestionsMark);
studentQuestionMarkRouter.post("/getReport",studentQuestionMarkController.getReport);
studentQuestionMarkRouter.post("/downloadReport",studentQuestionMarkController.downloadReport);


export default studentQuestionMarkRouter;