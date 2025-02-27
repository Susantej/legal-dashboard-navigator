import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom'

export function MenuDropdown() {
  const navigate = useNavigate();

  //Get the data from local storage and then use it check if the user is logged in
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" className="w-[200px] justify-between">
    //       Select an option
    //       <ChevronDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-[200px]">
    //     <DropdownMenuLabel>Menu Options</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>Option 1</DropdownMenuItem>
    //     <DropdownMenuItem>Option 2</DropdownMenuItem>
    //     <DropdownMenuItem>Option 3</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className="flex gap-4">
      {user ? (
        <button className="border-b-3 hover:bg-gray-200 border-gray-200 shadow-md p-3 rounded-lg text-xs font-medium"
          // onClick={() => navigate('/courtney-sessions')}
        > Hi, {user.firstName} </button>
      )
    :
      <div className="">
        <button className="border-b-3 cursor-pointer hover:bg-gray-200 border-gray-200 shadow-md p-3 rounded-lg text-xs font-medium"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button className="bg-black p-3 rounded-lg text-white cursor-pointer hover:bg-gray-700 text-xs font-medium"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    }
    </div>
  );
}