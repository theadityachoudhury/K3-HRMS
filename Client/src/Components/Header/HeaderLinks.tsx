// import { navLinks } from "../../Utils/NavLinks";
// import { Link, useLocation } from "react-router-dom";

// const HeaderLinks = () => {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex space-x-4">
//       {navLinks.map((link, index) => (
//         <Link
//           key={index}
//           to={link.link}
//           className={`${pathname == link.link ? "text-indigo-700" : "text-black"} hover:text-indigo-500 py-2`}
//         >
//           {link.title}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default HeaderLinks;


import { useUserContext } from "../../Hooks/useUserContext";
import { navLinks } from "../../Utils/NavLinks";
import { Link, useLocation } from "react-router-dom";

const HeaderLinks = () => {
  const { pathname } = useLocation();
  const { authenticated,isLoggedIn } = useUserContext();

  const renderLink = (link:any, index:number) => {
    // Check if the link requires authentication and the user is logged in
    if (link.isAuth && !authenticated && !isLoggedIn()) {
      return null;
    }

    if (link.isDisabled) {
      return (
        <span
          key={index}
          className="text-gray-400 cursor-not-allowed py-2 flex items-center"
        >
          {link.title}
        </span>
      );
    }

    if (link.isExternal) {
      return (
        <a
          key={index}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-indigo-500 py-2 flex items-center"
        >
          {link.icon && <img src={link.icon} alt={link.title} className="inline-block mr-2" />}
          {link.title}
        </a>
      );
    }

    if (link.isButton) {
      return (
        <button
          key={index}
          onClick={() => window.location.href = link.link}
          className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black duration-300 ease-linear border border-black flex items-center"
        >
          {link.icon && <img src={link.icon} alt={link.title} className="inline-block mr-2" />}
          {link.title}
        </button>
      );
    }

    if (link.isNested && link.nestedLinks) {
      return (
        <div key={index} className="relative group flex items-center">
          <Link
            to={link.link}
            className="text-black hover:text-indigo-500 py-2 flex items-center"
          >
            {link.title}
          </Link>
          <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-48">
            <div className="flex flex-col space-y-2 py-2">
              {link.nestedLinks.map((nestedLink:any, nestedIndex:number) => (
                <Link
                  key={nestedIndex}
                  to={nestedLink.link}
                  className={`${pathname === nestedLink.link ? "text-indigo-700" : "text-black"} hover:text-indigo-500 py-2 px-4`}
                >
                  {nestedLink.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={index}
        to={link.link}
        className={`${pathname === link.link ? "text-indigo-700" : "text-black"} hover:text-indigo-500 py-2 flex items-center`}
      >
        {link.icon && <img src={link.icon} alt={link.title} className="inline-block mr-2" />}
        {link.title}
      </Link>
    );
  };

  return (
    <div className="flex space-x-4 items-center">
      {navLinks.map((link, index) => renderLink(link, index))}
    </div>
  );
};

export default HeaderLinks;