import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-gradient shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">✨</span>
              Character Generator
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Gallery
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 