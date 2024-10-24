"use client";
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Get the session to check if user is authenticated

  return (
    <nav className="bg-orange-400 text-neutral-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold">Alibobo</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden w-1/3 md:flex">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-3 py-2 text-sm text-black rounded-md focus:outline-none"
                placeholder="Search products..."
              />
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-black top-2.5 right-3" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="hidden space-x-4 md:flex">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="ml-1 lg:inline md:hidden">Home</span>
            </Link>
            <Link
              href="/seller/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
            >
              <BuildingStorefrontIcon className="w-6 h-6" />
              <span className="ml-1 lg:inline md:hidden">Start Selling</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="ml-1 lg:inline md:hidden">Cart</span>
            </Link>

            {/* Conditional Account/Logout Links */}
            {session ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
                >
                  <UserIcon className="w-6 h-6" />
                  <span className="ml-1 lg:inline md:hidden">Account</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
                >
                  <UserIcon className="w-6 h-6" />
                  <span className="ml-1 lg:inline md:hidden">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-orange-500"
              >
                <UserIcon className="w-6 h-6" />
                <span className="ml-1 lg:inline md:hidden">Login / Register</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-50 hover:bg-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
            >
              <HomeIcon className="w-6 h-6" />
              <span className="ml-1">Home</span>
            </Link>
            <Link
              href="/start-selling"
              className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
            >
              <BuildingStorefrontIcon className="w-6 h-6" />
              <span className="ml-1">Start Selling</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="ml-1">Cart</span>
            </Link>

            {/* Conditional Account/Logout Links for Mobile */}
            {session ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
                >
                  <UserIcon className="w-6 h-6" />
                  <span className="ml-1">Account</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
                >
                  <UserIcon className="w-6 h-6" />
                  <span className="ml-1">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-orange-500"
              >
                <UserIcon className="w-6 h-6" />
                <span className="ml-1">Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
