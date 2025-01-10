import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/",(req,res,next)=>{
    res.send("<h1>Hi!!</h1>");
});


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
