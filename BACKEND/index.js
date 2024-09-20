import express from "express";
import dotenv from "dotenv"; 
import connectDb from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();


// using middlewares 
app.use(express.json());
app.use(cors());


// importing routers 

import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// using routes 

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () =>{
    console.log(`server is working on port ${process.env.PORT}`);
    connectDb();
});