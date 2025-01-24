import express from "express";
import * as examController from "../controllers/examController.js";

const examRouter = express.Router();

examRouter.get("/",examController.getAllExams);
examRouter.get("/:subjectId/:year/:name",examController.getExamByNameSubjectIdYearSemester)
examRouter.post("/create",examController.createExam);
examRouter.get("/uniqueexamname",examController.getUniqueExamNames);


export default examRouter;