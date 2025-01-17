import express from 'express';
import { uploadStudents,getAllStudents,getStudentsByYearAndSec } from '../controllers/studentController.js';
const studentRouter =  express.Router();

studentRouter.post("/upload",uploadStudents);
studentRouter.get("/",getAllStudents);
studentRouter.get("/:year/:sec",getStudentsByYearAndSec);

export default studentRouter;