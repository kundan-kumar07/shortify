import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Link2,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <Link2 size={28} />
          <span>Shortify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-blue-600"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="rounded-lg border border-blue-600 px-5 py-2 text-blue-600 transition hover:bg-blue-50">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full rounded-lg border border-blue-600 py-2 text-blue-600">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-white">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;