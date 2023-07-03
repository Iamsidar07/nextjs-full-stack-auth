'use client'
import Link from 'next/link'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);



  useEffect(() => {
    setIsButtonDisabled(!user.email || !user.password || isLoading);
  }, [user, isLoading]);


  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/user/login',user);
      if (response.status === 200) {
        toast.success('Login successfull.');
        setUser({
          email: '',
          password: '',
        });
        // push to other page (home page)
        router.push('/profile');
      }
    } catch (error:any) {
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  }


  const handleShowPassword: MouseEventHandler<HTMLImageElement> = (e) => {
    setShowPassword((prevState) => !prevState);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="bg-white rounded-lg p-2.5  md:px-6 md:py-4 w-full max-w-md  gap-3 flex flex-col shadow-sm border ">
        <h1 className="text-lg text-center text-black">{isLoading?"Processing":"Login"}</h1>
        <div className="border-b-[1px]" />
        <label htmlFor="email" className="text-sm">Email</label>
        <input
          className="pl-4 py-2.5 border bg-transparent rounded-md  outline-none"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="text-sm">Password</label>
        <div className="pl-4 pr-2 py-2.5 border bg-transparent rounded-md  flex items-center justify-between">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className='outline-none flex-1'
            required
          />
          <Image src={showPassword ? "/icons/show.png" : "/icons/hide.png"} alt='' width={20} height={20} className='object-contain cursor-pointer' onClick={handleShowPassword} />
        </div>
        <button
          onClick={onLogin}
          disabled={isButtonDisabled}
          className={`outline-none py-2 md:py-2.5  text-white rounded-md mt-8 ${isButtonDisabled ? "bg-blue-500" : "bg-blue-700"}`}>{
            isLoading ? "Processing" : "Login"
          }
        </button>
        <p className="text-center mt-4 text-black">
          Don&apos;t have an account ?
          <Link href="/signup" className="text-blue-600"> Signup </Link>
        </p>

        <div className='flex items-center'>
          <div className='w-full border' />
          <span className='text-center mx-1'>Or</span>
          <div className='w-full border' />
        </div>
        <div className='flex flex-col items-center gap-2'>
          {
            Array(3).fill(0).map((_, i) => (<button
              key={i}
              className="outline-none py-2 md:py-2.5 bg-blue-600 text-white rounded-md w-full">Continue with Google
            </button>))
          }
        </div>
      </div>
    </div>
  )
}

export default Login