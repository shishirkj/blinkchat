import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-purple-200 flex justify-center items-center h-screen ">
    {children}
  </div>
  
  )
}
