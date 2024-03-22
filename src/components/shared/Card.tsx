import React from 'react'

export const Card = () => {
  return (
    <div>
        <div >
        <a
  href="#"
  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <h5 className=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Features
  </h5>
  <ol start={1} className="list-decimal pl-4" >
    <br/>
  <li className="font-normal text-white">
  AI Chat: Utilizing advanced artificial intelligence algorithms, this feature provides users with intelligent chatbot capabilities
  </li>
  <br />
  <li className="font-normal text-white">
  Video Call: Seamlessly connect with others through high-quality video calls, enabling face-to-face communication regardless of physical distance.
  </li>
  <br />
  <li className="font-normal text-white">
  File Transfer: Simplify the sharing of documents, images, videos, and other files with the File Transfer feature.
  </li>
  <br />
  <li className="font-normal text-white">
  Smooth Real-Time Chat: Experience fluid and uninterrupted communication with Smooth Real-Time Chat. Leveraging cutting-edge technology
  </li>

    </ol> 
  
 
</a>
</div>
    </div>
  )
}
