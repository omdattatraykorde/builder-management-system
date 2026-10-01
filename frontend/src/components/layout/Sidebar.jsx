import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";

import sidebarMenu from "../../constants/sidebarMenu";
import appConfig from "../../constants/appConfig";

export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("remember_email");

    navigate("/");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-screen">

      {/* Logo */}
      <div className="p-8 border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
            <FaBuilding className="text-white text-xl" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-amber-400">
              {appConfig.appName}
            </h1>

            <p className="text-gray-400 text-sm">
              {appConfig.appSubtitle}
            </p>

          </div>

        </div>

      </div>

      {/* Logged In User */}
      <div className="px-6 py-5 border-b border-slate-700">

        <p className="text-sm text-gray-400">
          Logged in as
        </p>

        <p className="font-semibold text-white mt-1">
          {user.name || appConfig.company.owner}
        </p>

        <p className="text-xs text-orange-400 mt-1 uppercase">
          {user.role || "Builder"}
        </p>

      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        {sidebarMenu.map((group) => (
          <div
            key={group.section}
            className="mb-8"
          >

            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3 px-2">
              {group.section}
            </h3>

            <div className="space-y-2">

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md"
                          : "text-gray-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="text-lg" />

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}

            </div>

          </div>
        ))}

      </div>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition rounded-xl py-3 font-semibold"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* Footer */}
      <div className="pb-4 text-center text-xs text-gray-500">
        © 2026 BuildTrack
      </div>

    </aside>
  );
}