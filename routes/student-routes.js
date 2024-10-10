import express from "express";
import { uploadStudentsFromExcel,upload } from "../controllers/student-controller.js";

const studentRouter = express.Router();

studentRouter.post("/upload",upload.single('file'),uploadStudentsFromExcel)


export default studentRouter;