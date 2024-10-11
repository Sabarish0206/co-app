import express from 'express';
import pool from './config/db.js';
import dotenv from 'dotenv';
import studentRouter from './routes/student-routes.js';
import subjectRouter from './routes/subject-routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//middlewares
app.use(express.json());
app.use("/student",studentRouter)
app.use("/subject",subjectRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Connected to DB');
});