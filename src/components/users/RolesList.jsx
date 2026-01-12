import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

const rolesData = [
  {
    role: "Admin",
    description: "Full system access",
    icon: "pi pi-shield",
    color: "bg-red-50 text-red-600",
    permissions: [
      "Manage Users",
      "Manage Products",
      "Manage Orders",
      "Manage Stock",
    ],
  },
  {
    role: "Sales",
    description: "Handles customer orders",
    icon: "pi pi-shopping-cart",
    color: "bg-green-50 text-green-600",
    permissions: [
      "Create Orders",
      "View Orders",
      "View Products",
    ],
  },
  {
    role: "Warehouse",
    description: "Manages inventory & stock",
    icon: "pi pi-warehouse",
    color: "bg-orange-50 text-orange-600",
    permissions: [
      "Update Stock",
      "View Products",
      "Stock History",
    ],
  },
  {
    role: "Viewer",
    description: "Read-only access",
    icon: "pi pi-eye",
    color: "bg-blue-50 text-blue-600",
    permissions: [
      "View Users",
      "View Products",
      "View Orders",
    ],
  },
];

export default function RolesList() {
  return (
    <div className="space-y-4">
      {rolesData.map((role) => (
        <div
          key={role.role}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${role.color}`}
              >
                <i className={`${role.icon} text-lg`} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {role.role}
                </h3>
                <p className="text-sm text-gray-500">
                  {role.description}
                </p>
              </div>
            </div>

            <Tag
              value={role.role}
              className="px-3 py-1 text-xs font-medium"
            />
          </div>

          <Divider className="!my-4" />

          {/* Permissions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Access Permissions
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {role.permissions.map((perm) => (
                <div
                  key={perm}
                  className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
                >
                  <i className="pi pi-check-circle text-green-600 text-sm" />
                  <span className="text-sm text-gray-700">
                    {perm}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
