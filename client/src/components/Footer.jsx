import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <Link2 size={26} />
            <span>Shortify</span>
          </div>

          <p className="mt-3 max-w-xs text-sm text-gray-500">
            Shorten, manage and share your links with confidence.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900">Product</h3>
            <Link to="/" className="text-gray-500 hover:text-blue-600">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-500 hover:text-blue-600">
              Dashboard
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <button className="text-left text-gray-500 hover:text-blue-600">
              Documentation
            </button>
            <button className="text-left text-gray-500 hover:text-blue-600">
              API
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <button className="text-left text-gray-500 hover:text-blue-600">
              About
            </button>
            <button className="text-left text-gray-500 hover:text-blue-600">
              Contact
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Shortify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;