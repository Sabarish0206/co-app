import express from 'express';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Connected to DB');
});