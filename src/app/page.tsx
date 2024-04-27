
import Link from "next/link"

export default function page() {
  return (
    <div
      key="1"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 dark:bg-gray-950"
    >
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl animate-[slideInLeft_1s_ease-out]">
          BLINKCHAT
        </h1>
        <p className="text-lg text-gray-400">The fastest and most secure chat app for your team.</p>
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md bg-gray-50 px-6 text-lg font-medium text-gray-900 transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 dark:bg-gray-50 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
          href={"/sign-up"}
        >
          SIGN UP TO BLINKCHAT
        </Link>
        <div className="grid grid-cols-3 gap-4 text-gray-400">
         
          <div className="hover:text-gray-50 transition-colors duration-300 " >
            SUPER-FAST
          </div>
          <div className="hover:text-gray-50 transition-colors duration-300 " >
            AI-HELP
          </div>
          <div className="hover:text-gray-50 transition-colors duration-300 " >
            SECURE-CHAT
          </div>
         
        </div>
      </div>
    </div>
  )
}


