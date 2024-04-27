"use client"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Page({params,searchParams}:any) {
  const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";

    async function handleAcceptRequest(){ 
     
      const {email} = searchParams;
      const {userid} = params;
   try {
    
    const {data} =await  axios.get(`${API_BASE_URL}/api/acceptinvite/${userid}?email=${email}`)
   const {invitedByPersonsname} = await data
   toast.success(`You have Accepted Friend Request From ${invitedByPersonsname} please send friendRequest to him/her as well `)
   } catch (error:any) {
    toast.error(error.response.data.mssg)
   }

    }


  return (
    <div key="1" className="flex min-h-[100dvh] items-center justify-center bg-gray-900 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-6 shadow-lg dark:bg-gray-800">
        <h1 className="text-center text-3xl font-bold text-gray-50">Welcome to BlinkChat!</h1>
        <Button onClick={handleAcceptRequest} className="w-full font-medium">Accept Request</Button>
        <Button className="w-full font-medium">
          <Link href="/home" >  Return To Home</Link>
        </Button>
      </div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  )
}
