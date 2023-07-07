'use client'
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  useEffect(() => {
    setIsButtonDisabled(!user.username || !user.email || !user.password || isLoading);
  }, [user, isLoading]);

  const onSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/user/signup',user);
      console.log(response);
      if (response.status===200) {
        toast.success('Signup Success');
        setUser({
          username: '',
          email: '',
          password: '',
        });
        // push to other page (home page)
        router.push('/login');
        return;
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleShowPassword: MouseEventHandler<HTMLImageElement> = (e) => {
    setShowPassword((prevState) => !prevState);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="bg-white rounded-lg p-2 py-3 md:px-6 md:py-4 w-full max-w-md  gap-3 flex flex-col shadow backdrop-blur-lg ">
        <h1 className="text-lg text-center">{isLoading ? "Processing" : "Signup"}</h1>
        <div className="border-b-[1px]" />
        <label htmlFor="username" className="text-sm">Username</label>
        <input
          className="pl-4 py-2.5 border bg-transparent rounded-md outline-none"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          required
        />
        <label htmlFor="email" className="text-sm">Email</label>
        <input
          className="pl-4 py-2.5 border bg-transparent rounded-md outline-none"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          required
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
          onClick={onSignup}
          disabled={isButtonDisabled}
          className={`outline-none py-2 md:py-2.5  text-white rounded-md mt-8 ${isButtonDisabled ? "bg-blue-500" : "bg-blue-700"}`}>{
            isLoading ? "Processing" : "Signup"
          }
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account ?
          <Link href="/login" className="text-blue-600"> Login </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup