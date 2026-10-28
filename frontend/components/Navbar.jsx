import { useState } from "react";
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

export default Navbar;
