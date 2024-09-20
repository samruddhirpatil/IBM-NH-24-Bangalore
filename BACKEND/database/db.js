import mongoose, { connect } from "mongoose";

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.Db_url,
            {
                dbName: "Helpmate",
            }
        );
        console.log("Connectected to database");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;
