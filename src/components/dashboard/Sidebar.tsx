import {
  LogOut,
  LayoutDashboard,
  MessageSquareText,
  Users,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import logo from "@/assets/images/logo.png";

type Props = {
  onMenuClick: () => void;
};

export const Sidebar = ({ onMenuClick }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    dispatch(logout());
  };

  const salesMenu = [
    { href: "/feedback", label: "Feedback", icon: MessageSquareText },
  ];

  const userCustomerMenu = [
    { href: "/users", label: "Users", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const MenuHeader = ({ title }: { title: string }) => (
    <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mt-4 mb-2">
      {title}
    </p>
  );

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="flex h-full flex-col gap-6 px-4 py-5 bg-white shadow-md w-full overflow-auto">
      {/* Logo & Close */}
      <div className="flex items-center justify-between">
        <img
          src={logo}
          onClick={onMenuClick}
          alt="logo"
          className="h-12 w-auto cursor-pointer"
        />

        <button
          className="block md:hidden p-2 rounded hover:bg-gray-100"
          onClick={onMenuClick}
          aria-label="Close sidebar"
        >
          <X className="text-gray-700 w-8 h-8 bg-slate-200 rounded-full p-1" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <MenuHeader title="Main" />
        <ul className="flex flex-col gap-2">
          <li onClick={onMenuClick}>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-cyan-100 text-cyan-900"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard
                className={`${
                  isActive("/dashboard") ? "text-cyan-900" : "text-slate-500"
                }`}
                size={18}
              />
              <span>{`Dashboard`}</span>
            </Link>
          </li>
        </ul>

        <MenuHeader title="Diagnosis History" />
        <ul className="flex flex-col gap-2">
          {salesMenu.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} onClick={onMenuClick}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-cyan-50 text-cyan-900"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={active ? "text-cyan-900" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <MenuHeader title="Users" />
        <ul className="flex flex-col gap-2">
          {userCustomerMenu.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} onClick={onMenuClick}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-cyan-50 text-cyan-900"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={active ? "text-cyan-900" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
