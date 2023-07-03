import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
interface TokenData {
    id: string;
    email:string;
    username:string;
}
export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ' ';
        const tokenData:TokenData = jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log(tokenData);
        return tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}