import express from 'express'
import cors from 'cors'
import graphRoutes from './routes/graphRoutes'
import cookieParser from 'cookie-parser'

const server = express();

server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(cookieParser())
server.use(cors()); // Add this line

// ------------------- Routers
server.use('/cluster', graphRoutes)

const start = async () => {
    try {
        console.log('Starting server..');
        server.listen(5000, () => console.log('Server is listening on port 5000....'));
    } catch (error: any) {
        console.log(error.message);
    }
};

start().then(() => console.log("Done."));

// module.exports = server
