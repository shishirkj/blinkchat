import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignupPage() {
  return (
    <div>
        <SignUp afterSignUpUrl="/home"/>
    </div>
  )
}

