import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

class App {    
    constructor() {
        this.server = express();

        this.database();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(express.json());
    }

    database() {
        mongoose.connect("mongodb+srv://fromzero:msUTq6W3eGUbPqhD@cluster0.qhkbc.mongodb.net/fromzerodb?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
        );
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;