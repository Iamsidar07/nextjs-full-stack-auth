import { NextApiRequest } from "next";

export const GET = async (req:NextApiRequest)=>{
    return {
        status: 200,
        data: "Hello World"
    }
}