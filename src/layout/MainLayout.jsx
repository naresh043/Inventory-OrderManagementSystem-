import { Outlet } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
import SidebarMenu from "../components/common/Sidebar";
import AccountSidebar from "../components/common/AccountSidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
  import Logo from "../../public/Logoo.png"; 

const MainLayout = () => {
  const [search, setSearch] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
    const { user } = useContext(AuthContext);

  return (
    <>
  

<header className="h-16 flex items-center justify-between px-6 bg-white ">
  <div className="flex items-center gap-2">
    <div className="h-10 w-10 flex items-center justify-center rounded-lg  overflow-hidden">
      <img
        src={Logo}
        alt="Inventory Logo"
        className="h-10 w-10 object-contain"
      />
    </div>
    <span className="text-lg font-semibold text-gray-800">
      Inventory
    </span>
  </div>

  {/* Profile */}
  <div onClick={() => setAccountOpen(true)} className="cursor-pointer">
    <Avatar
      label={user?.name?.slice(0, 2).toUpperCase() || "U"}
      shape="circle"
      className="bg-blue-600 text-white"
    />
  </div>
</header>


      {/* Layout */}
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100 ">
        <SidebarMenu />
        <main className="flex-1  mt-4 ml-4 rounded-md overflow-hidden">
          <Outlet />
        </main>
      </div>

      {/* Account Panel */}
      <AccountSidebar
        visible={accountOpen}
        onHide={() => setAccountOpen(false)}
      />
    </>
  );
};

export default MainLayout;
