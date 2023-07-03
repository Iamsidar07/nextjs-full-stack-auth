'use client'

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
    //   const queryString = window.location.search;
    //   const urlParams = new URLSearchParams(queryString);
    //   const token = urlParams.get('token');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
   

    const verifyEmail = async () => {
        try {
            const res = await axios.post('/api/user/verifyEmail', { token });
            console.log({ res });
            toast.success('Email verified.');
            router.push('/');
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full'>
            <div className="p-2 md:p-6 rounded-2xl border shadow-sm">
                <h1 className="text-center text-2xl mb-6">Verify your email</h1>
                <button onClick={verifyEmail} className="outline-none py-2 md:py-2.5 bg-blue-600 text-white rounded-md w-full max-w-xs">VerifyEmail</button>
            </div>
        </div>
    )
}

export default VerifyEmail