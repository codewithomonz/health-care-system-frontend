import { Menu } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/features/store";
import { logout } from "@/features/auth/authSlice";

type Props = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: Props) => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between md:justify-end h-12 px-5 bg-white">
      <button
        className="block md:hidden p-2 rounded hover:bg-gray-100"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="h-8 w-8 rounded-full bg-cyan-950 text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
