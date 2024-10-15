import express from 'express';
import {insertMark,getCoDetails}  from '../controllers/mark-controller.js';

const markRouter = express.Router();

markRouter.post('/',insertMark)
markRouter.get('/',getCoDetails)
export default markRouter