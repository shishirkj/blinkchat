import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInpage() {
  return (
    <div >
    <SignIn afterSignInUrl="/home"/>
    </div>
  )
}
