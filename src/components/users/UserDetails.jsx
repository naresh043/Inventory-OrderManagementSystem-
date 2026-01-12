import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

export default function UserDetails({ user }) {
  const isActive = user.isActive;

  return (
    <div className="space-y-6 text-sm">
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Email: <span className="font-medium">{user.email}</span>
          </p>
        </div>

        <Tag
          value={isActive ? "Active" : "Inactive"}
          severity={isActive ? "success" : "danger"}
          className="px-3 py-1 text-xs"
        />
      </div>

      <Divider className="!my-2" />

      {/* ================= INFO CARDS ================= */}
      <div className="grid grid-cols-2 gap-4">
        {/* Role */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-100">
            <i className="pi pi-id-card text-indigo-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Role</p>
            <p className="font-medium text-gray-800 capitalize">
              {user.role}
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-100">
            <i className="pi pi-check-circle text-green-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Account Status</p>
            <p className="font-medium text-gray-800">
              {isActive ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>

        {/* Created At */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-100">
            <i className="pi pi-calendar text-blue-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Created On</p>
            <p className="font-medium text-gray-800">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500 mb-1">Current Status</p>
          <Tag
            value={isActive ? "Active User" : "Inactive User"}
            severity={isActive ? "success" : "danger"}
            className="px-3 py-1 text-xs"
          />
        </div>
      </div>
    </div>
  );
}
