import { Fragment } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";
import api from "../lib/axios";
import useUserStore from "../Store/userStore";

const NavBar = () => {
  const user = useUserStore();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      clearUser();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">User App</h1>

        {user?.id && (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded hover:bg-gray-600">
              <CiUser /> {user.firstName}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        } flex items-center gap-2`}
                      >
                        <IoIosLogOut /> Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
