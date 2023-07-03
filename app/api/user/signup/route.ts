import { connectToDB } from "@/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/helper/sendMails";

export const POST = async (req: NextRequest) => {
    let { username, email, password } = await req.json();
    try {
        connectToDB();
        //check if user already exists
        if (username === "" || email === "" || password === "") {
            return NextResponse.json({ message: "Please fill all fields.", success: false, status: 400 });
        }
        const isUserAllreadyExist = await User.findOne({ email });
        if (isUserAllreadyExist) {
            return NextResponse.json({ message: "User already exists", success: false, status: 400 });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // send verification email
        await sendEmail({ email,emailType:"VERIFY",userId:savedUser._id.toString() });

        return NextResponse.json({ user: savedUser, message: 'Signup successfully.', success: true, status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false, status: 500 });
    }

}