"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Car,
  Frame,
  LayoutDashboard,
  LogOut,
  User2Icon,
} from "lucide-react";
import LogoutButton from "../LogOut/LogoutButton";

const Sidebar = () => {
  const path = usePathname();

  const NAVLINKS = [
    { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { label: "Cars", url: "/cars", icon: Car },
    { label: "Profile", url: "/profile", icon: User2Icon },
  ];

  return (
    <>
      {/* Sidebar for medium and above */}
      <div className="hidden md:flex sticky  top-0 h-screen w-20 border-r border-primary/10 flex-col justify-between items-center my-10 py-10 z-50">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <Frame className="text-white" />
        </div>

        {/* Navigation */}
        <aside className="flex flex-col gap-6 items-center">
          {NAVLINKS.map(({ label, url, icon: Icon }, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={url}
                    className={`p-3 rounded-lg hover:bg-muted/50 ${
                      path === url ? "text-primary bg-muted/60" : "text-white/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="center" side="right" className="ml-1">
                  <p className="capitalize text-white text-xs">{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </aside>

        {/* Logout */}
        <div className="pb-4">
          <LogoutButton>
            <LogOut className="w-5 h-5 text-white" />
          </LogoutButton>
        </div>
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="md:hidden bottom-0  backdrop-blur-lg fixed  left-0 right-0 min-h-16 border-t border-primary/10 flex justify-around items-center z-50 py-5">
        {NAVLINKS.map(({ label, url, icon: Icon }, index) => (
          <Link
            key={index}
            href={url}
            className={`flex flex-col items-center text-xs ${
              path === url ? "text-primary" : "text-white/40"
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </Link>
        ))}
         <div className="md:pb-4">
          <LogoutButton>
            <LogOut className="w-4 h-4 text-white" />
          </LogoutButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
