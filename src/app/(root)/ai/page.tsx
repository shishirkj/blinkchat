"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import React, { useState } from "react";
import axios from "axios";

interface BotIconProps { 
    className:string
}



export default function Page() {

  const [prompt,setPrompt]  = useState<string>("");
  //this is just to show the typed prompt in ui
  const [userResponse,setUserResponse] =useState<string>();
  const [promptResponse,setPromptResponse]  = useState<string>();
  const [censored,setCensored] = useState<boolean>(true);

  const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";


  function handleChange(e:React.ChangeEvent<HTMLInputElement>){ 
    setPrompt(e.target.value)
  }

  async function handleSubmit(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>){ 

    
      try {
        const res =  await axios.post(`${API_BASE_URL}/api/ai`,{prompt,censored})
    setPromptResponse(res.data.mssg);
    setUserResponse(prompt)
    
    setPrompt('')

      } catch (error:any) {
        toast.error(error.response.data.mssg)
      }
  }

  function handleSarcasticMode(){ 
setCensored(false);
toast.success("Sarcastic mode")
  }

  function handleCensorMode(){
    setCensored(true);
    toast.success("censor mode");
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit(); // Call handleSubmit function and pass the event object
    }
  }

  return (
    
    <div  className="flex  flex-col h-screen bg-gray-950 text-gray-50">
      <header className="bg-gray-900 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BotIcon className="h-8 w-8" />
          <Link href={"/home"} className="text-xl font-bold">BlinkChat</Link>
        </div>
        <div className="flex items-center space-x-4">
         
          <Link className="hover:underline" href={"/home"}>
            Home
          </Link>
        </div>
      </header>
      <main className="flex-1 flex  flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-6">
        <Button onClick={handleSarcasticMode} className="mx-2">
             Sarcastic  Mode
            </Button>
            <Button onClick={handleCensorMode} className="mx-2">
              Censored Mode
            </Button>
          <div className="flex items-center bg-gray-900 rounded-md px-4 py-2">
            <Input onKeyDown={handleEnter} value={prompt} onChange={handleChange}
              className="bg-transparent flex-1 focus:outline-none"
              placeholder="Enter your prompt..."
              type="text"
            />
            <Button onClick={handleSubmit} className="mx-2">
              <SendIcon className="h-5 w-5" />
            </Button>
           
          </div>
          <div className="bg-gray-900 rounded-md p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage alt="ChatGPT" src="/placeholder-avatar.jpg" />
                <AvatarFallback>GPT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>Hello! im an AI assistant created by Mistral_X_86. How can I help you today?</div>
              </div>
            </div>
      {userResponse&& <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
             <div className="flex-1">
                <p>{userResponse}</p>
              </div>

            </div>}
            {promptResponse&& <div className="flex items-start space-x-4 overflow-scroll overflow-x-hidden h-[19em]">
              <Avatar>
                <AvatarImage alt="ChatGPT" src="/placeholder-avatar.jpg" />
                <AvatarFallback>GPT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
               <p>
                  {promptResponse}
                </p>
               
              </div>
            </div>}
          </div>
        </div>
      </main>
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

const BotIcon:React.FC<BotIconProps>=(props)=> {
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
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


const SendIcon:React.FC<BotIconProps>=(props)=> {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

