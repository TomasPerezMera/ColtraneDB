require('dotenv').config();
import express from 'express';
import userRouter from './routes/user.router.js';
import mongoose from 'mongoose';

const app = express();
const server = app.listen(8080, () => console.log('Server is running on port 8080'));

mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit()
    }
});

app.use('/api/users', userRouter);