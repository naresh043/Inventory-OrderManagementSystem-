import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";

import UserDetails from "./UserDetails";
import UserForm from "./UserForm";

import {
  fetchUsers,
  editUserRole,
  removeUser,
} from "../../store/slices/userSlice";

import { usePostApiMutation } from "../../store/slices/apiSclice";
import Loader from "../common/GlobelLoader";

export default function UserList({
  dialogVisible,
  setDialogVisible,
  dialogMode,
  setDialogMode,
  globalSearch,
}) {
  const dispatch = useDispatch();
  const { list: users, loading } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [createUser] = usePostApiMutation();
  const toast = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    setFilters({
      global: { value: globalSearch, matchMode: FilterMatchMode.CONTAINS },
    });
  }, [globalSearch]);

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (dialogMode === "create") {
      setSelectedUser(null);
    }
  }, [dialogMode]);

  const statusTemplate = (row) => (
    <Tag
      value={row.isActive ? "Active" : "Inactive"}
      severity={row.isActive ? "success" : "danger"}
      className="px-3 py-1 text-xs font-medium rounded-full"
    />
  );

  const actionTemplate = (row) => (
    <div className="flex items-center gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-text p-button-sm text-blue-600"
        onClick={() => {
          setSelectedUser(row);
          setDialogMode("view");
          setDialogVisible(true);
        }}
      />

      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm text-green-600"
        onClick={() => {
          setSelectedUser(row);
          setDialogMode("edit");
          setDialogVisible(true);
        }}
      />

      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-sm text-red-600"
        onClick={() => dispatch(removeUser(row.id))}
      />
    </div>
  );

  const handleSubmit = async (data) => {
    try {
      if (dialogMode === "create") {
        const res = await createUser({
          url: "/users",
          body: data,
        }).unwrap();

        if (res?.success) {
          dispatch(fetchUsers());

          toast.current.show({
            severity: "success",
            summary: "User Created",
            detail: "New user created successfully",
            life: 3000,
          });

          setTimeout(() => {
            setDialogVisible(false);
          }, 300);
        }
      }

      if (dialogMode === "edit") {
        dispatch(editUserRole({ id: data.id, role: data.role }));

        toast.current.show({
          severity: "success",
          summary: "User Updated",
          detail: "User role updated successfully",
          life: 3000,
        });

        setTimeout(() => {
          setDialogVisible(false);
        }, 300);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Action Failed",
        detail: "Something went wrong",
        life: 3000,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Loader show={loading} />

      <DataTable
        value={users}
        dataKey="id"
        scrollable
        scrollHeight="calc(100vh - 335px)"
        size="small"
        paginator
        rows={5}
        stripedRows
        rowHover
        filters={filters}
        globalFilterFields={["name", "email", "role"]}
        emptyMessage="No users found"
        className="erp-table text-sm [&_.p-datatable-tbody>tr>td]:py-2"
      >
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" />
        <Column field="role" header="Role" />
        <Column header="Status" body={statusTemplate} />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>

   
      <Toast ref={toast} position="top-right" />

      <Dialog
        header={
          dialogMode === "view"
            ? "User Details"
            : dialogMode === "create"
            ? "Create User"
            : "Edit User"
        }
        visible={dialogVisible}
        style={{ width: "480px" }}
        modal
        draggable={false}
        onHide={() => {
          setDialogVisible(false);
          setSelectedUser(null);
        }}
      >
        {selectedUser && dialogMode === "view" && (
          <UserDetails user={selectedUser} />
        )}

        {(dialogMode === "edit" || dialogMode === "create") && (
          <UserForm
            initialData={
              dialogMode === "create"
                ? { name: "", email: "", role: "viewer" }
                : selectedUser
            }
            isEdit={dialogMode === "edit"}
            onSubmit={handleSubmit}
          />
        )}
      </Dialog>
    </div>
  );
}
