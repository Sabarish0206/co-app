import * as questionService from '../services/questionPaperService.js';
import multer from 'multer';
import * as coService from '../services/coService.js';


export const getAllQuestions = async (req, res) => {
        try {
            const questions = await questionService.getAllQuestions();
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    };

const upload = multer({ dest: 'uploads/' });

export const uploadQuestionPaper =[
    upload.single('file'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        try {
            const questions = await questionService.parseQuestionPaper(req.file.path);
            res.status(200).json({ message: 'Parse Questions from Question Paper', questions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error uploading question paper', error: error.message });
        }
    }
]

export const createQuestions = async (req, res) => {
        try {
            const {subject,questionList,exam} = req.body;
            const questions = await questionService.createQuestions(subject,questionList,exam);
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    };

export const getQuestionsByExam = async (req,res)=>{
    try{
        const {subjectCode,examName,examYear,semester}=req.params;
        const exam = {examName,year:parseInt(examYear),semester:parseInt(semester)};
        const questions = await questionService.getQuestionsByExam(subjectCode, exam);
        res.status(200).json(questions);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}