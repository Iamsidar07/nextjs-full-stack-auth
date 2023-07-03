import { sendEmail } from "@/helper/sendMails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
   try {
    const { email, userId } = await req.json();
    await sendEmail({ email, emailType:'RESET', userId });
    return NextResponse.json({
        message:'Reset email has been sent successfully.',
        success:true,
    },{status:200});
   } catch (error:any) {
      return NextResponse.json({
        error:error.message,
        success:false
      },{status:500})
   }
}