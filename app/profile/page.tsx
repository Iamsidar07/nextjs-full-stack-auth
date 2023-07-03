'use client'
import { sendEmail } from "@/helper/sendMails";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/user/me');
        setUser(response.data.user);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(getUserDetails(), {
      loading: "Fetching user details...",
      success: "Fetched user details successfull.",
      error: (err) => err.message
    })
  }, []);


  const logout = async () => {
    try {
      await axios.get('/api/user/logout');
      toast.success('Logout successfull');
      router.push('/login');
    } catch (error: any) {
      toast.error("Failed to logout.");
    }
  }

  const handleForgotPassword = async () => {
    try {
      await axios.post('/api/user/sendEmailForForgotPassword',{ email: user.email, userId: user._id });
      toast('Reset password email sent.');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <div className="p-2 md:p-6 rounded-2xl border shadow-sm ">
        {
          isLoading && <div className="p-2">Loading details...</div>
        }
        {
          (user && !isLoading) && <div className="p-2 gap-2 flex flex-col">
            <p>id: <Link href={`/profile/${user._id}`} className=" text-purple-500">{user._id}</Link></p>
            <p>email: {user.email}</p>
            <p>username: {user.username}</p>
            <p>Verification status: {user.isVerified ?"✔️":"❌"}</p>
          </div>
        }
        {
          (!user && !isLoading) && <div className="p-2">
            No any user
          </div>
        }
        <button
          onClick={logout}
          className="outline-none py-2 md:py-2.5 bg-blue-600 text-white rounded-md w-full max-w-xs">
          Logout
        </button>
        <button
          onClick={handleForgotPassword}
          className="outline-none py-2 md:py-2.5 bg-blue-600 text-white rounded-md w-full max-w-xs mt-2">
          Forgot password
        </button>
      </div>

    </div>
  )
}

export default Profile