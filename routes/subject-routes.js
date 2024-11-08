import express from "express";
import { insertSubject, getSubjectDetails} from "../controllers/subject-controller.js";

const subjectRouter = express.Router();


subjectRouter.post("/", insertSubject);
subjectRouter.get("/", getSubjectDetails);


export default subjectRouter;
