import express from "express";
import { insertSubject, getSubjectDetails,getSubjectByCode, createSubjectTable } from "../controllers/subject-controller.js";

const subjectRouter = express.Router();


subjectRouter.post("/", insertSubject);
subjectRouter.get("/", getSubjectDetails);
subjectRouter.get("/subjectCode",getSubjectByCode)


export default subjectRouter;
