import express from 'express';
import subjectRouter from './routes/subjectRoutes.js'
import studentRouter from './routes/studentRoutes.js'
import questionPaperRouter from './routes/questionPaperRouter.js';
import examRouter from './routes/examRoutes.js';
import studentQuestionMarkRouter from './routes/studentQuestionMarkRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/subjects",subjectRouter);
app.use("/students",studentRouter);
app.use("/questionpaper",questionPaperRouter);
app.use("/exam",examRouter)
app.use("/studentQuestionMarks",studentQuestionMarkRouter);





app.use("/",(req,res,next)=>{
    res.send("<h1>Hi!!</h1>");
});

// app.listen(3000, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

export default app;
