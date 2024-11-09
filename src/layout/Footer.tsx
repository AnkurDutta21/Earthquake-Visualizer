import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-dark backdrop-blur-xl border-t border-stroke py-4 px-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          Data provided by{' '}
          <a href="#" className="text-accent-pink hover:text-accent-pink-light transition-colors">
            USGS Earthquake Service
          </a>
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-accent-pink transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-accent-pink transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
