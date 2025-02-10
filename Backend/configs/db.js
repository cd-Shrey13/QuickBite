import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();



const URL = process.env.ENV === 'DEV' ? process.env.DEV_DB_URL : process.env.DATABASE_SECRET;

const connectToDb = async () => {
    try{
        await mongoose.connect(URL);
        console.log('Connected to database');
    } catch (error){
        console.log(error.message);
    }
}

export default connectToDb;