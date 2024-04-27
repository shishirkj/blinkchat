"use client"
import React from 'react';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Button from './Button';
import { UserButton } from '@clerk/nextjs';
import Loading from '@/app/loading';

function Sidebar() {

  const [friendArray,setFriendArray] = useState<Array<friendArrayInf>>([])
  const [loading,setLoading] = useState<boolean>(true);

  const fetchAllFriends=async()=>{
    const API_BASE_URL = process.env.NEXT_PUBLIC_MODE==="production"?'https://blinkchat-nu.vercel.app':'http://localhost:3000'
    const res = await axios.get(`${API_BASE_URL}/api/getallfriends`)
  
    const list = res.data;
    setFriendArray(list.mssg);
  }


  
  useEffect(()=>{ 
    fetchAllFriends();
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


 


  return (
    <div className="bg-red-400  lg:w-[200px] w-[150px] h-screen overflow-y-auto">
        <UserButton  afterSignOutUrl="/home" />
      <div className="px-4">
      <h4 className="flex items-center text-2xl  underline  my-2 font-extrabold dark:text-white">FRIENDS</h4>
    { loading?<Loading/>:( <ul>
      {/* her emailId the friendz mongoid(_id) clicked on and passing to room  component*/}
          {friendArray&&friendArray.map(user => (
            <Link href={`/room/${user.emailId}`} key={user._id} className="flex items-center py-5 border-b">
              <Image width={40} height={40} src={user.photo} alt={user.firstName} className=" rounded-full mr-2" />
              <span  className='font-roboto  '>{user.firstName}</span>
              <span  className='font-roboto  '>{user.lastName}</span>
            </Link>
          ))}
        </ul>)
}
      </div>
      <Button >
        <Link href={"/sendFriendRequest"}>
          Add friend +
          </Link>
      </Button>
      <Button >
        <Link href={"/ai"}>
          AI HELP
          </Link>
      </Button>
    </div>
  );
};

export default Sidebar;
