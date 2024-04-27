"use client"
import { friendDetails } from '@/lib/actions/user.actions';
import React from 'react'
import { useEffect,useState } from 'react';
import Image from 'next/image';
interface HeaderProps {
  frndId: string; 
}

export default function Header({frndId}:HeaderProps) {

  const [name,setName] = useState<string|undefined>();
const [profilePic,setProfilePic] = useState<string|undefined>();


  


  useEffect(()=>{
    async function fetchFriendDetail(){
      const data = await friendDetails(frndId);

      setName(data.name)
      setProfilePic(data.photo)
    }
    //server action for image and name of clicked friend
fetchFriendDetail();
  },[frndId])

  return (
    <div >
      <div  className='flex flex-col justify-end'>
<div className="px-5 py-5   bg-gradient-to-r from-purple-500 to-pink-500 flex justify-between items-center  border-b-2">
{profilePic&&name&&<Image width={40} height={40} src= {profilePic} alt={name} className="rounded-full mr-2" />}
  {name&&<div className="font-semibold text-2xl">{name}</div>}
</div>
</div>

    </div>
  )
}
