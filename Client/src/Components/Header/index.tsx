import { Link } from "react-router-dom";
import config from "../../Config";
import AuthButtons from "./AuthButtons";
import HeaderLinks from "./HeaderLinks";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="text-xl p-4 sm:px-8 sm:py-4 bg-white text-black shadow-sm">
      <div className="hidden lg:flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold hover:text-indigo-500">
            {config.APP_NAME}
          </h1>
        </Link>
        <div className="flex space-x-4">
          <HeaderLinks />
          <AuthButtons />
        </div>
      </div>

      <div className="flex lg:hidden justify-between items-center">
        <MobileMenu />
        <Link to="/">
          <h1 className="text-3xl font-bold hover:text-indigo-500">
            {config.APP_NAME}
          </h1>
        </Link>
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
