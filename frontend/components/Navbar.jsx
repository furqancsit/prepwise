import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/auth/context/authContextProvider";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#pricing" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggedIn = Boolean(user);

  const name =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const email = user?.email || "";
  const avatar = user?.avatar || user?.profilePicture || user?.image;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#faf9f6]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6d5ce8] text-white shadow-sm shadow-violet-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m5 12 4 4L19 6" />
              <path d="M12 22a10 10 0 1 0-10-10" />
            </svg>
          </span>

          <span className="text-xl font-bold tracking-tight text-[#242321]">
            prepwise<span className="text-[#6d5ce8]">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-stone-500 transition hover:text-[#6d5ce8]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop authentication actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#242321] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#403d39]"
              >
                Get started
                <ArrowIcon />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#6d5ce8] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5c4bd4]"
              >
                Dashboard
                <ArrowIcon />
              </Link>

              {/* Profile dropdown */}
              <div className="relative ">

                <button
                  type="button"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                  className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-1.5 pr-3 transition hover:border-violet-200 hover:bg-stone-50 cursor-pointer"
                >
                  <Avatar avatar={avatar} initials={initials} />

                  <span className="max-w-28 truncate text-sm font-medium text-stone-700">
                    {name}
                  </span>

                  <ChevronIcon />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl shadow-stone-900/5">
                    <div className="flex items-center gap-3 px-3 py-3 ">
                      <Avatar
                        avatar={avatar}
                        initials={initials}
                        size="large"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-stone-900">
                          {name}
                        </p>
                        <p className="truncate text-xs text-stone-500">
                          {email}
                        </p>
                      </div>
                    </div>

                    <div className="my-1 border-t border-stone-100" />

                    <DropdownLink to="/dashboard" onClick={closeMenus}>
                      <DashboardIcon />
                      Dashboard
                    </DropdownLink>

                    <DropdownLink to="/profile" onClick={closeMenus}>
                      <UserIcon />
                      My profile
                    </DropdownLink>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogoutIcon />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition hover:bg-stone-100 md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Responsive mobile menu */}
      {menuOpen && (
        <div className="border-t border-stone-200/70 bg-[#faf9f6] px-5 pb-5 pt-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenus}
                className="rounded-xl px-3 py-3 text-sm font-medium text-stone-600 transition hover:bg-white hover:text-[#6d5ce8]"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-2 border-t border-stone-200 pt-4">
              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700"
                  >
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="flex items-center justify-center rounded-xl bg-[#6d5ce8] px-4 py-3 text-sm font-medium text-white"
                  >
                    Get started
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
                    <Avatar avatar={avatar} initials={initials} size="large" />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-stone-900">
                        {name}
                      </p>
                      <p className="truncate text-xs text-stone-500">{email}</p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#6d5ce8] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5c4bd4]"
                  >
                    <DashboardIcon />
                    Go to dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-600 hover:bg-white"
                  >
                    <UserIcon />
                    My profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogoutIcon />
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Avatar({ avatar, initials, size = "normal" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-violet-100 font-semibold text-violet-700 ${
        size === "large" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs"
      }`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt="Profile"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        initials || "U"
      )}
    </span>
  );
}

function DropdownLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-950"
    >
      {children}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 text-stone-400"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
    </svg>
  );
}
=======
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../src/auth/context/authContextProvider";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
      setIsOpen(false);
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          My<span className="text-blue-600">Brand</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Login Button */}

          {user ? (
            <div>
              <span className="text-black font-bold">Welcom {user.name}</span>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-3 sm:px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Login */}

{ user ? (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="mb-3 rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <div className="mt-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Login
              </Link> 
              </div>)}


          
        </div>
      </div>
    </nav>
  );
};
>>>>>>> e269103bb87213ce0b97f124348183aa22fb983e

export default Navbar;
