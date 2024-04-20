"use client"
import React from 'react';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Button from './Button';


function Sidebar() {

  const [friendArray,setFriendArray] = useState<Array<friendArrayInf>>([])

  const fetchAllFriends=async()=>{
    const API_BASE_URL = process.env.NEXT_PUBLIC_MODE==="production"?'https://blinkchat-nu.vercel.app':'http://localhost:3000'
    const res = await axios.get(`${API_BASE_URL}/api/getallfriends`)
  
    const list = res.data;
    setFriendArray(list.mssg);
  }



  useEffect(()=>{ 
fetchAllFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="bg-red-400  lg:w-[200px] w-[150px] h-screen overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="px-4">
        <ul>
          {friendArray&&friendArray.map(user => (
            <Link href={`/room/${user.emailId}`} key={user._id} className="flex items-center py-5 border-b">
              <Image width={40} height={40} src={user.photo} alt={user.firstName} className=" rounded-full mr-2" />
              <span  className='font-roboto  '>{user.firstName}</span>
              <span  className='font-roboto  '>{user.lastName}</span>
            </Link>
          ))}
        </ul>
      </div>
      <Button>
        <Link href={"/sendFriendRequest"}>
          Add friend +
          </Link>
      </Button>
    </div>
  );
};

export default Sidebar;
