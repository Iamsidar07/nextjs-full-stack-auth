'use client'

import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
    //   const queryString = window.location.search;
    //   const urlParams = new URLSearchParams(queryString);
    //   const token = urlParams.get('token');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!password || isLoading);
    }, [password, isLoading]);

    const resetPassword = async () => {
        try {
            const res = await axios.post('/api/user/resetPassword', { token, password });
            console.log({ res });
            toast.success('Reset passowrd success');
            router.push('/');
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };
    const handleShowPassword: MouseEventHandler<HTMLImageElement> = (e) => {
        setShowPassword((prevState) => !prevState);
    }
    return (
        <div className='flex flex-col items-center min-h-screen w-full'>
            <h1 className="text-center text-2xl mb-6 mt-12">Reset your password</h1>
            <div className="p-2 md:p-6 rounded-2xl border shadow-sm w-full max-w-md">
                <label htmlFor="password" className="text-sm">Password</label>
                <div className="pl-4 pr-2 py-2.5 border bg-transparent rounded-md  flex items-center justify-between">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className='outline-none flex-1'
                        required
                    />
                    <Image src={showPassword ? "/icons/show.png" : "/icons/hide.png"} alt='' width={20} height={20} className='object-contain cursor-pointer' onClick={handleShowPassword} />
                </div>
                <button onClick={resetPassword} disabled={isButtonDisabled}
                    className={`outline-none py-2 md:py-2.5  text-white rounded-md mt-8 w-full ${isButtonDisabled ? "bg-blue-500" : "bg-blue-700"}`}>{
                        isLoading ? 'Proccessing' :'Reset Password'
                    }</button>
            </div>
        </div>
    )
}

export default ResetPassword