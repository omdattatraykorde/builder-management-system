import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import appConfig from "../../constants/appConfig";

import {
  FaBell,
  FaSearch,
  FaBuilding,
  FaChevronDown,
  FaUser,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("remember_email");

    navigate("/");
  };

  const openProfile = () => {
    setMenuOpen(false);
    navigate("/dashboard/profile");
  };

  const openChangePassword = () => {
    setMenuOpen(false);
    navigate("/dashboard/change-password");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Construction Management System
        </h1>

        <p className="text-sm text-gray-500">
          Manage your sites efficiently
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <FaSearch
            className="text-gray-600"
            size={18}
          />
        </button>

        <button className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <FaBell
            className="text-gray-600"
            size={18}
          />

          <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <div className="h-8 w-px bg-gray-300"></div>

        <div
          className="relative"
          ref={menuRef}
        >
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
              <FaBuilding size={18} />
            </div>

            <div className="text-left">
              <p className="font-semibold text-gray-800">
                {user.name ||
                  appConfig.company.owner}
              </p>

              <p className="text-sm text-gray-500">
                {user.role || "Builder"}
              </p>
            </div>

            <FaChevronDown className="text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

              <div className="px-4 py-3 border-b">
                <p className="font-semibold">
                  {user.name ||
                    appConfig.company.owner}
                </p>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              <button
                onClick={openProfile}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
              >
                <FaUser />
                My Profile
              </button>

              <button
                onClick={openChangePassword}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
              >
                <FaKey />
                Change Password
              </button>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;