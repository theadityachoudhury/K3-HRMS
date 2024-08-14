// import { Logs, X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import config from "../../Config";

// const MobileMenu = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//       setIsMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <div>
//       <button onClick={toggleMobileMenu} className="text-black p-2 rounded">
//         {isMobileMenuOpen ? <X size={35} /> : <Logs size={35} />}
//       </button>

//       <div
//         ref={menuRef}
//         className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-40 transform ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//           <span className="text-3xl font-bold hover:text-indigo-500">
//             {config.APP_NAME}
//           </span>
//           <button className="rounded-md" onClick={toggleMobileMenu}>
//             <X size={24} className="text-black hover:text-indigo-500" />
//           </button>
//         </div>
//         <div className="p-4">
//           <ul className="space-y-4 text-black">
//             <li>
//               <a href="/login" className="hover:text-indigo-500">
//                 Log in
//               </a>
//             </li>
//             <li>
//               <a href="/register" className="hover:text-indigo-500">
//                 Sign up
//               </a>
//             </li>
//             <li>
//               <a href="/pricing" className="hover:text-indigo-500">
//                 Plans & Pricing
//               </a>
//             </li>
//             <li className="mt-4 font-bold text-black">Most popular</li>
//             <li>
//               <a
//                 href="/topic/web-development"
//                 className="hover:text-indigo-500"
//               >
//                 Web Development
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/topic/mobile-development"
//                 className="hover:text-indigo-500"
//               >
//                 Mobile Development
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/topic/game-development"
//                 className="hover:text-indigo-500"
//               >
//                 Game Development
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/topic/entrepreneurship"
//                 className="hover:text-indigo-500"
//               >
//                 Entrepreneurship
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;


import { Logs, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import config from "../../Config";
import { navLinks } from "../../Utils/NavLinks";
import { Link, useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Function to check if the user is logged in (example mock function)
  const isLoggedIn = () => {
    return !!localStorage.getItem("authToken");
  };

  const renderNavLink = (link: any) => {
    if (link.isAuth && !isLoggedIn()) {
      return null;
    }

    if (link.isDisabled) {
      return (
        <li key={link.title} className="text-gray-400 cursor-not-allowed">
          {link.title}
        </li>
      );
    }

    if (link.isExternal) {
      return (
        <li key={link.title}>
          <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
          >
            {link.title}
          </a>
        </li>
      );
    }

    if (link.isButton) {
      return (
        <li key={link.title}>
          <button
            onClick={() => navigate(link.link)}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 w-full text-left"
          >
            {link.title}
          </button>
        </li>
      );
    }

    if (link.isNested && link.nestedLinks) {
      return (
        <li key={link.title} className="group">
          <div className="flex justify-between items-center hover:text-indigo-500">
            {link.title}
          </div>
          <ul className="ml-4 mt-2 space-y-2">
            {link.nestedLinks.map((nestedLink: any) => (
              <li key={nestedLink.title}>
                <Link
                  to={nestedLink.link}
                  className="hover:text-indigo-500"
                  onClick={toggleMobileMenu} // Close the menu when a nested link is clicked
                >
                  {nestedLink.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={link.title}>
        <Link
          to={link.link}
          className="hover:text-indigo-500"
          onClick={toggleMobileMenu} // Close the menu when a link is clicked
        >
          {link.title}
        </Link>
      </li>
    );
  };

  return (
    <div>
      <button onClick={toggleMobileMenu} className="text-black p-2 rounded">
        {isMobileMenuOpen ? <X size={35} /> : <Logs size={35} />}
      </button>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-40 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-3xl font-bold hover:text-indigo-500">
            {config.APP_NAME}
          </span>
          <button className="rounded-md" onClick={toggleMobileMenu}>
            <X size={24} className="text-black hover:text-indigo-500" />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-4 text-black">
            {navLinks.map((link) => renderNavLink(link))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
