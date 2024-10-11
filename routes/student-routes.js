import express from "express";
import { uploadStudentsFromExcel,upload,insertStudent,getStudentDetails } from "../controllers/student-controller.js";

const studentRouter = express.Router();

studentRouter.post("/",insertStudent)
studentRouter.post("/upload",upload.single('file'),uploadStudentsFromExcel)
studentRouter.get("/",getStudentDetails)





export default studentRouter;