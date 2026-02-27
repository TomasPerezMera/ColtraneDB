import 'dotenv/config';
import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js';


const app = express();
const httpServer = app.listen(process.env.PORT, () => console.log('Escuchando en Puerto: ' + process.env.PORT));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);
app.use('/api/users', userRouter);



const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión con éxito a MongoDB!');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};
connectMongoDB();