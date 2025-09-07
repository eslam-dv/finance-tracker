import { User } from "lucide-react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white dark:bg-black py-5 shadow z-50">
      <nav className="container mx-auto px-5 sm:px-0  flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">
            <Link to="/">FT</Link>
          </h1>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <ToggleTheme />
          </li>
          <li className="bg-gray-500 text-white p-1 rounded-full">
            <User />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
