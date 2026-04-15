import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

const AppLayout = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuLinkClass =
    "block w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                UniLibrary
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/my-loans"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Loans
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-300 dark:border-gray-700">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hola, <span className="font-bold">{user?.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ml-4"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 flex flex-col gap-1">
            <Link to="/" className={menuLinkClass}>
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/my-loans" className={menuLinkClass}>
                My Loans
              </Link>
            )}

            <hr className="border-gray-200 dark:border-gray-700 my-1" />

            <button onClick={toggleTheme} className={menuLinkClass}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            <hr className="border-gray-200 dark:border-gray-700 my-1" />

            {isAuthenticated ? (
              <>
                <p className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                  Signed in as <span className="font-bold text-gray-800 dark:text-gray-100">{user?.name}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center px-3 py-2 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
