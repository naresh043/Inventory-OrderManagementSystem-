import { useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AccountSidebar = ({ visible, onHide }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);

  const initials = user?.name
    ? user.name.trim().slice(0, 2).toUpperCase()
    : "";

  const roleLabel = user?.role ? user.role.toUpperCase() : "";

  const handleLogout = () => {
    
    toast.current.show({
      severity: "success",
      summary: "Logged Out",
      detail: "You have been logged out successfully",
      life: 2000,
    });
    
    setTimeout(() => {
      logout();
      onHide();
      navigate("/login");
    }, 500);
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />

      <Dialog
        visible={visible}
        onHide={onHide}
        modal
        draggable={false}
        resizable={false}
        showCloseIcon={false}
        position="right"
        style={{ width: "400px", maxHeight: "85vh" }}
        contentClassName="p-0"
        className="account-sidebar-dialog"
      >
        <div className="flex flex-col h-full p-5 bg-white">
          <div className="flex items-center justify-between pb-3 border-b">
            <span className="text-sm font-semibold text-gray-500">
              ACCOUNT
            </span>
            <button
              onClick={onHide}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="pi pi-times text-lg" />
            </button>
          </div>

          <div className="flex-1 py-4">
            <button className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-500 rounded-lg bg-blue-50">
              Profile
            </button>
          </div>

          <div className="flex items-center gap-3 py-4 border-t">
            <Avatar label={initials} shape="circle" />
            <div>
              <p className="font-semibold text-gray-800">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t">
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              severity="danger"
              text
              className="w-full justify-center logout-btn"
              onClick={handleLogout}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AccountSidebar;
