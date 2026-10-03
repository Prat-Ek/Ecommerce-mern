"use client";

import { useAuth } from "@/lib/hook/useAuth";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Shield,
  Store,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const notifications = [
  { id: 1, text: "New order #1234 received", time: "5m ago", read: false },
  { id: 2, text: "Product 'X' is low on stock", time: "1h ago", read: false },
  { id: 3, text: "Customer review on 'Y'", time: "3h ago", read: true },
];

export default function AdminHeader() {
  const router = useRouter()
  const {loggedInUser} = useAuth()
  console.log ({loggedInUser})
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (!loggedInUser) return;
    await logout();
   router.push("/")
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/admin/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo / Brand */}
          <Link href="/admin" className="flex shrink-0 items-center gap-2 text-xl font-bold">
            <Shield className="h-5 w-5 text-blue-600" />
            Admin
          </Link>

          {/* Global Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-lg sm:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, products, customers..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-foreground placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              className="rounded-full p-2 text-foreground hover:bg-gray-100 sm:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            {/* View Store */}
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-gray-100 sm:flex"
            >
              <Store className="h-4 w-4" />
              View Store
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsNotificationsOpen(false), 200)}
                className="relative rounded-full p-2 text-foreground hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg bg-white py-1 shadow-lg">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`border-b border-gray-50 px-4 py-3 hover:bg-gray-50 ${!n.read ? "bg-blue-50/50" : ""}`}
                      >
                        <p className="text-sm text-foreground">{n.text}</p>
                        <p className="mt-0.5 text-xs text-gray-400">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/admin/notifications"
                    className="block border-t border-gray-100 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-gray-50"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                className="flex items-center gap-2 rounded-full p-1 pr-2 text-foreground hover:bg-gray-100"
              >
                <Image
                crossOrigin="anonymous"
                  src={loggedInUser?.image?.url || "/default-avatar.png"}
                  alt={loggedInUser?.username || "Admin user"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden text-sm font-medium md:block">{loggedInUser?.username}</span>
                 <ChevronDown/>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md bg-white py-1 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</p>
                    <p className="text-xs text-gray-400">{loggedInUser?.email}</p>
                  </div>
                  {/* <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link> */}
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                  onClick={handleLogout}
                    type="submit"
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="rounded-full p-2 text-foreground hover:bg-gray-100 md:hidden"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isMobileSearchOpen && (
          <div className="pb-3 sm:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders, products, customers..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-foreground placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Mobile View Store Link */}
            <Link
              href="/"
              target="_blank"
              className="mt-2 flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-gray-100"
            >
              <Store className="h-4 w-4" />
              View Store
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
