import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import UserList from "../../components/users/UserList";
import RolesList from "../../components/users/RolesList";

const UsersPage = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("view");
  const [globalSearch, setGlobalSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-black/10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users & Roles</h1>

        <Button
          label="Add Users"
          icon="pi pi-plus"
          className="bg-indigo-600 border-indigo-600 !text-white rounded-md px-4 py-2 font-medium gap-2"
          onClick={() => {
            setDialogMode("create");
            setDialogVisible(true);
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-auto px-5 pt-0">
        <div className="bg-white">

          {/* 🔹 Tabs + Search (SAME ROW) */}
          <div className="flex items-center justify-between px-4 py-3 border-gray-200">
            {/* Tabs (LEFT) */}
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="users-tabs"
            >
              <TabPanel header="Users" />
              <TabPanel header="Roles" />
            </TabView>

            {/* Search (RIGHT – ABOVE TABLE ONLY) */}
            {activeIndex === 0 && (
              <span className="p-input-icon-left">
                <i className="pi pi-search text-gray-400 ml-5" />
                <InputText
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-64 pl-10 h-10"
                />
              </span>
            )}
          </div>

          {/* 🔹 TAB CONTENT */}
          <div className="p-1  ">
            {activeIndex === 0 && (
              <UserList
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                dialogMode={dialogMode}
                setDialogMode={setDialogMode}
                globalSearch={globalSearch}
              />
            )}

            {activeIndex === 1 && <RolesList />}
          </div>

        </div>
      </div>
    </div>
    
  );
};

export default UsersPage;
