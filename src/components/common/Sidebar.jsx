import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { roleMenus } from "../../routes/roleRoutes";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const menus = roleMenus[user.role] || [];

  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col mt-4 ml-2 rounded-md">
      {/* Logo */}

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menus.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `
              group relative flex items-center gap-3 px-4 py-2.5 rounded-md
              text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-r-md
                    ${isActive ? "bg-indigo-600" : "bg-transparent"}
                  `}
                />

                {/* Icon */}
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-md
                    ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }
                  `}
                >
                  <i className={`${item.icon} text-sm`} />
                </div>

                {/* Label */}
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
