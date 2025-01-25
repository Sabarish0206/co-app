import express from 'express';
import { uploadStudents,getAllStudents,getStudentsByYearAndSec,getStudentsByYearSecAndDept } from '../controllers/studentController.js';
const studentRouter =  express.Router();

studentRouter.post("/upload",uploadStudents);
studentRouter.get("/",getAllStudents);
studentRouter.get("/:year/:sec",getStudentsByYearAndSec);
studentRouter.get("/:year/:sec/:dept",getStudentsByYearSecAndDept);

export default studentRouter;