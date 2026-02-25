import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        require: [true, 'El email es obligatorio y debe ser único']
    },
    password: String
},
    {
        versionKey: false
    }
);

export const userModel = mongoose.model(userCollection, userSchema);