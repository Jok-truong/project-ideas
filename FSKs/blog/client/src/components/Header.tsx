import { Link, useNavigate } from "react-router-dom";
import images from "../constants/images";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Navbar from "./Navbar";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();

  const [navIsVisible, setNavIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<{ admin: boolean } | null>();
  const [profileDropdown, setProfileDropdown] = useState(false);

  console.log(profileDropdown, "profileDropdown");

  const logoutHandler = () => {};

  return (
    <section className="sticky top-0 left-0 ring-0 z-50 bg-white">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <Link to="/">
          <img className="w-16" src={images.Logo} alt="logo" />
        </Link>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={() => setNavIsVisible((prev) => !prev)}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 h-6"
              onClick={() => setNavIsVisible((prev) => !prev)}
            />
          )}
        </div>

        <Navbar navIsVisible={navIsVisible} />

        {userInfo ? (
          <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            <div className="relative group">
              <div className="flex flex-col items-center">
                <button
                  className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  <span>Account</span>
                  <MdKeyboardArrowDown />
                </button>

                <div
                  className={`lg:hidden sm:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block sm:group-hover:block w-max sm:absolute sm:top-16 lg:top-0
               
                  `}
                >
                  <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                    {
                      <button
                        onClick={() => navigate("/admin")}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Admin Dashboard
                      </button>
                    }

                    <button
                      onClick={() => navigate("/profile")}
                      type="button"
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Profile Page
                    </button>
                    <button
                      onClick={logoutHandler}
                      type="button"
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Sign in
          </button>
        )}
      </header>
    </section>
  );
};

export default Header;
