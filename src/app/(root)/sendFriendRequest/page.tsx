"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface MailIconProps{ 
    className:string
}



export default function Page() {

    const [email,setEmail]= useState<string>('')

    const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){ 
        setEmail(e.target.value)
    }

async function handleSubmit(e:React.FormEvent<HTMLFormElement>){ 
    e.preventDefault()
    try {
        const data = await axios.post(`${API_BASE_URL}/api/sendinvite`, { email });
      
                toast.success("Request sent Successfully")
                setEmail('')
            
    } catch (error) {
        toast.error("Server down")
    }
    
}

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-900 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100 dark:text-gray-100">
            Sign up for Blink Chat
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400 dark:text-gray-400">
            Get the latest updates and features by signing up for our newsletter.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-gray-600 dark:text-gray-600" />
              </div>
              <input
                autoComplete="email"
                className="block w-full max-w-[300px] rounded-md border-gray-600 pl-10 pr-12 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                type="email"
              />
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 ml-2">
                <Button
                  className="rounded-r-md bg-blue-600 text-white absolute right-[-1rem] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  type="submit"
                >
                  Sign up
                </Button>
          
              </div>
            </div>
           
          </div>
        
        </form>
        <Button className="rounded-r-md bg-blue-600 text-white absolute  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            <Link href={"/home"}> Return To Home Page</Link>
                
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

const MailIcon:React.FC<MailIconProps>=(props)=> {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>



  )
}



