
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface NavbarProps {
  user: User | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ user, darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleGoogleSignIn = async () => {
    // Mock sign in
    console.log("Sign in with Google");
  };

  const handleGithubSignIn = async () => {
    // Mock sign in
    console.log("Sign in with GitHub");
  };

  const handleSignOut = async () => {
    // Mock sign out
    console.log("Sign out");
  };

  return (
    <nav className="flex items-center justify-between p-2 sm:p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <h1 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">Codex IDE</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          )}
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
            >
              <img
                src={user.photoURL || "https://ui-avatars.com/api/?name=" + user.displayName}
                alt="User avatar"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              />
              <span className="hidden md:inline text-sm font-medium">
                {user.displayName || user.email}
              </span>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 sm:mr-2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
              <span className="hidden sm:inline">Sign in</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
