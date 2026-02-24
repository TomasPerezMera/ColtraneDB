import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: String,
});

export const userRouter = mongoose.model(userCollection, userSchema);