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

export function MenuDropdown() {
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
      <button className="border-b-3 cursor-pointer hover:bg-gray-200 border-gray-200 shadow-md p-3 rounded-lg text-xs font-medium">
        Login
      </button>
      <button className="bg-black p-3 rounded-lg text-white cursor-pointer hover:bg-gray-700 text-xs font-medium">
        Sign Up
      </button>
    </div>
  );
}