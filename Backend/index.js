import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();

const app = express();
app.use(express.json());

// Allow requests from frontend
app.use(cors({ origin: `${process.env.FRONTEND_URL}` })); 

app.get('/',(req, res) => {
  res.status(200).json({ message: 'Hello World' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})