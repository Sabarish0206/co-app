import express from 'express';
import {insertMark,getMarkDetails}  from '../controllers/mark-controller.js';

const markRouter = express.Router();

markRouter.post('/',insertMark)
markRouter.get('/',getMarkDetails)
export default markRouter