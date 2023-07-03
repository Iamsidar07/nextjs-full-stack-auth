import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI as string);
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("Connected to DB");
        });
        db.on("error", (err) => {
            console.log("Error connecting to DB", err);
            process.exit();
        });
    } catch (error) {
        console.log('Something went wrong: ', error);
    }

};