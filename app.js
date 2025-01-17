import express from 'express';
import subjectRouter from './routes/subjectRoutes.js'
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/subjects",subjectRouter)




app.use("/",(req,res,next)=>{
    res.send("<h1>Hi!!</h1>");
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
