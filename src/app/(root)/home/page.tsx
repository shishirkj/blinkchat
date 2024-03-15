import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
<div className="min-h-screen flex flex-col text-white">
			<main className="container mx-auto px-6 pt-16 flex-1 text-center">

				<h2 className=" text-3xl md:text-6xl lg:text-8xl uppercase font-black mb-8">Welcome to</h2>
				<h1 className="text-2xl md:text-4xl lg:text-6xl uppercase">The Future of Communication</h1>
                <h1 className=" mt-5 text-2xl md:text-4xl lg:text-6xl uppercase">Powered with AI</h1>				

					<div className="flex flex-col md:flex-row justify-center mb-4">
					<Link href={'/sign-up'} className=" mt-20 text-lg md:text-2xl lg:text-3xl py-2 px-4 md:py-4 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 w-fit mx-auto mb-8 rounded-full">SIGN UP TO BLINKCHAT</Link>
					</div>


			</main>

		
		</div>	
  )
}
