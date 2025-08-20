import { Search } from "lucide-react";

export default function Navbar() {
  const handleNavClick = (section) => {
    console.log(`Navigating to ${section}`);
    // Add your navigation logic here
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">Logo</h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('categories')}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                Categories
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}