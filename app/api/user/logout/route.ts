import { NextResponse } from "next/server"

export const GET = async () => {

    try {
        const response = NextResponse.json({
            message: 'Logout successfull.',
            success: true
        }, { status: 200 });

        // set token to empty
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

        return response;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        }, { status: 500 });
    }
}