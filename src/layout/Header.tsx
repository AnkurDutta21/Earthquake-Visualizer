import { HiMenu } from 'react-icons/hi';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-surface-dark backdrop-blur-xl p-6 flex justify-between items-center border-b border-stroke">
      <div className="flex items-center space-x-6">
        <button className="lg:hidden text-gray-400 hover:text-accent-pink transition-colors">
          <HiMenu className="w-6 h-6" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Search earthquakes..."
            className="bg-surface border border-stroke rounded-2xl py-2 px-4 pl-10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-pink/50 w-[300px]"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-accent-pink transition-colors relative">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent-pink rounded-full"></span>
        </button>
        <div className="w-px h-6 bg-stroke"></div>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-accent-pink transition-colors">
          <FaUserCircle className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
