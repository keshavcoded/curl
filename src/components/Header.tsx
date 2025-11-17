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
import { useAppContext } from "@/useAppContext";
import { useFetch } from "@/hooks/useFetch";
import { logout } from "@/lib/api/auth.api";
import { BeatLoader } from "react-spinners";

const Header = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { user, fetchuser } = useAppContext();

  /* console.log(user?.user_metadata); */

  const { loading, fn: logoutFn } = useFetch(logout);

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
              <Button
                onClick={() => navigate("/auth/login")}
                className="cursor-pointer"
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden cursor-pointer">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {loading ? (
                        <BeatLoader color="#888" size={1} />
                      ) : (
                        user?.user_metadata?.name?.charAt(0)?.toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to={"/dashboard"} className="flex items-center">
                      <Link2 className="mr-2 h-4 w-4" />
                      My Links
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      logoutFn().then(() => {
                        fetchuser();
                        navigate("/");
                      });
                    }}
                  >
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
