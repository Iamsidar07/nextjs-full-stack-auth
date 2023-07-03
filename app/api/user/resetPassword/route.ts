import { connectToDB } from "@/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
    const { token, password } = await req.json();
    try {
        connectToDB();
        // get the user
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Invalid token',
            }, { status: 400 });
        }

        // hash passowrd

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // forgotPasswordToken, forgotPasswordTokenExpiry
        user.password = hashedPassword;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpiry = undefined;

        //save changes

        await user.save();

        return NextResponse.json({
            message: 'Reset password successfull.'
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}