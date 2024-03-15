import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-cover bg-top bg-[url('/bg.png')]">{children}</div>
  )
}
