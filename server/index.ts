import express, { json } from 'express';
import cors from 'cors';
import { BinanceRoute } from './4-controllers/BinanceRoute';
import { UserRoute } from './4-controllers/userRoute';
import * as dotenv from 'dotenv';
dotenv.config();
const server = express();

server.use(json());
server.use(cors());

server.use(UserRoute);
server.use(BinanceRoute);

server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})