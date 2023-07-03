import { connectToDB } from "@/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { token } = await req.json();
    try {
        connectToDB();
        // get the user
        const user = await User.findOne({
            verifyEmailToken: token,
            verifyEmailTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Invalid token',
            }, { status: 400 });
        }

        // update verify, verifyEmailToken, verifyEmailTokenExpiry
        user.isVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpiry = undefined;

        //save changes

        await user.save();

        return NextResponse.json({
            message: 'Verify email successfull.'
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}