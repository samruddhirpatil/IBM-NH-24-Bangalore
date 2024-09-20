import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
},
    {
        timestamps:true,
    }

);

export const User = mongoose.model("User",schema);