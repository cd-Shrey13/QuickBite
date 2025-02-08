import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.get('/',(req, res) => {
  res.status(200).json({ message: 'Hello World' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})