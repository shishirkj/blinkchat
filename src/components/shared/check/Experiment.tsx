


import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


interface CircleEllipsisIconProps {
className:string
}

interface PlaneIconProps {
  className:string
} 

interface VideoIconProps{ 
  className:string
}
export default function Experiment() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-gray-800 w-64 border-r border-gray-700 p-4">
        <div className="mb-4">
          <input
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none text-white"
            placeholder="Search friends"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium text-gray-100">John Doe</h4>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <CircleEllipsisIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage alt="Jane Smith" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium text-gray-100">Jane Smith</h4>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <CircleEllipsisIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full">Add Friend</Button>
        </div>
      </div>
      <div className="flex-1 bg-gray-900 p-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-100">John Doe</h2>
          </div>
          <Button size="icon" variant="ghost">
            <CircleEllipsisIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start space-x-4 justify-end">
              <div className="flex-1">
                <div className="bg-blue-500 text-white rounded-lg p-3">
                  <p>Pretty good, thanks for asking!</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">10:31 AM</p>
              </div>
              <Avatar>
                <AvatarImage alt="You" src="/placeholder-avatar.jpg" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-100">Hey hows it going?</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            className="flex-1 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none text-white"
            placeholder="Type your message..."
            type="text"
          />
          <VideoIcon className="mr-2 h-5 w-5" />
          <Button className="bg-white text-gray-900" variant="default">
            <PlaneIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const CircleEllipsisIcon: React.FC<CircleEllipsisIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  );
};

const PlaneIcon:React.FC<PlaneIconProps>=(props)=> {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}


const VideoIcon:React.FC<VideoIconProps>=(props)=> {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}

