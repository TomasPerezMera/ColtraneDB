require('dotenv').config();
import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.router.js';


const app = express();
const httpServer = app.listen(8080, () => console.log('Listening on Port 8080'));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);
app.use('/api/users', userRouter);



mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit()
    }
});

