"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Car, Frame, LayoutDashboard, LogOut, User2Icon } from "lucide-react"
import LogoutButton from "../LogOut/LogoutButton"

const Sidebar = () => {
  const path = usePathname();

  const NAVLINKS = [
    { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { label: "Cars", url: "/cars", icon: Car },
    {label:"Profile", url:"/profile",icon: User2Icon},
  ];

  return (
    <div className="sticky top-0 h-screen w-20 border-r my-10">
     
      <div className="h-full flex flex-col items-center justify-between py-5">

        {/* Logo at the top */}
        <div className="flex flex-col justify-center items-center ">
          <Frame className="text-white" />
        </div>

        {/* Sidebar Navigation centered in the middle */}
        <aside className="flex flex-col items-center gap-6">
   
          {NAVLINKS.map(({ label, url, icon: Icon }, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={url}
                    className={`p-3 rounded-lg  hover:bg-muted/50 ${
                      path === url ? "text-primary bg-muted/60" : "text-white/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="center" side="left" className="ml-1">
                  <p className="capitalize text-white text-[12px]">{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </aside>

        {/* Logout button at the bottom */}
        <div className="flex justify-center pb-10">
          <LogoutButton>
            <LogOut className="w-5 h-5 text-white" />
          </LogoutButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
