import { NextRequest } from "next/server";
import  jwt, { JwtPayload }  from "jsonwebtoken";
interface TokenData {
    id: string;
    email:string;
    username:string;
}
export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ' ';
        const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET!) as JwtPayload;
        const tokenData: TokenData = {
            id: decodeToken.id as string,
            email: decodeToken.email as string,
            username: decodeToken.username as string,
        }
        console.log(tokenData);
        return tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}