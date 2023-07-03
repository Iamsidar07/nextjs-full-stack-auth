import { connectToDB } from "@/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const POST = async (req: NextRequest) => {
    let { email, password } = await req.json();
    try {
        connectToDB();
        //check if user already exists
        if (email === "" || password === "") {
            return NextResponse.json({ message: "Please fill all fields.", success: false }, { status: 400 });
        }
        // Check if there is user with this email
        const user = await User.findOne({ email, });
        if (!user) {
            return NextResponse.json({ message: "No user registered with this email.", success: false }, { status: 400 });
        }

        // Check if password is correct by comparing it with hashed password
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return NextResponse.json({ message: "Invalid Credentials", success: false }, { status: 400 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.name,
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        //create response
        const response = NextResponse.json({
            mesage: 'Logged in successfull.',
            success: true,
        }, { status: 200 });

        // set token in response cookies

        response.cookies.set('token', token,{ 
            httpOnly: true 
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }

}