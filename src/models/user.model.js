import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio!'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio!'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Error - email con caracteres inválidos!']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria!'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
}, {
    timestamps: true,
    versionKey: false
});

// Implementamos Paginate.
userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;