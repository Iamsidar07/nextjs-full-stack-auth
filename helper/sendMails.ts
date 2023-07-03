import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
interface SendEmailProps {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}
export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
    console.log('send email');
    console.log({
        emails:email,
        email: process.env.ADMIN_EMAIL,
        domain: process.env.DOMAIN,
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS
    });
    try {
        const hashedToken = await bcrypt.hash(userId, 10);
        // update token
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyEmailToken: hashedToken,
                verifyEmailTokenExpiry: Date.now() + 360000
            });

        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 360000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: `${process.env.NODEMAILER_AUTH_USER}`,
                pass: `${process.env.NODEMAILER_AUTH_PASS}`
            }
        });

        const mailOptions = {
            from: "ms8460149@gmail.com", // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // Subject line
            html: `<p>Click here <a href="https://nextjs-full-stack-auth-hoq2ymv7j-iamsidar07.vercel.app/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetPassword'}?token=${hashedToken}">${emailType === 'VERIFY' ? 'verify Email' : 'Reset Password'}<a/>
            <br/>
            or copy and paste the link in browser
            <br/>
            https://nextjs-full-stack-auth-hoq2ymv7j-iamsidar07.vercel.app/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetPassword'}?token=${hashedToken}`, // html body
        }
        const res = await transport.sendMail(mailOptions);
       
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }

}