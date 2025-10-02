import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2, LogOut, User } from "lucide-react";

const Header = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const user = false;

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backfrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                src={
                  theme === "dark"
                    ? "/curl-dark-logo.png"
                    : "/curl-light-logo.png"
                }
                alt="curl-logo"
                className="w-13 sm:w-21 m-3 sm:h-7"
                draggable="false"
              />
            </Link>
          </div>

          <div className="flex gap-x-4">
            <ModeToggle />
            {!user ? (
              <Button onClick={() => navigate("/auth/login")} className="cursor-pointer">Login</Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex justify-center items-center">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="">
                    <Link2 className="mr-2 h-4 w-4" />
                    My Links
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
