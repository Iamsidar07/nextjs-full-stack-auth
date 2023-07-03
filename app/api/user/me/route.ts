import { connectToDB } from "@/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (request: NextRequest) => {
    try {
        connectToDB();
        const id = await getDataFromToken(request);
        const user = await User.findById(id).select(
            '-password'
        );
        return NextResponse.json({
            user,
            message: 'User found.'
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
