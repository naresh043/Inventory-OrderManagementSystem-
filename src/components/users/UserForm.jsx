import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

const DEFAULT_FORM = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
};

export default function UserForm({
  initialData = DEFAULT_FORM,
  onSubmit,
  isEdit = false,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  // ✅ STORE ORIGINAL DATA FOR EDIT MODE
  const initialFormRef = useRef(null);

  useEffect(() => {
    const data = {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      role: initialData?.role || "viewer",
      id: initialData?.id,
    };

    setFormData(data);

    if (isEdit) {
      initialFormRef.current = data;
    }
  }, [initialData, isEdit]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // ✅ CHECK IF DATA CHANGED (EDIT MODE)
  console.log(isEdit);
  const isChanged = isEdit
    ? formData.role !== initialFormRef.current?.role
    : true;

  // ✅ FINAL DISABLE LOGIC
  const isButtonDisabled = isEdit
    ? !formData.name || !formData.email || !formData.role || !isChanged
    : !formData.name || !formData.email || !formData.password || !formData.role;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <i className="pi pi-user-edit text-indigo-600 text-lg" />
        <h2 className="text-lg font-semibold text-gray-900">
          User Information
        </h2>
      </div>

      <Divider className="!my-2" />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Name</label>

        <div className="relative">
          <i className="pi pi-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <InputText
            value={formData.name}
            disabled={isEdit}
            placeholder="e.g. Naresh Kumar"
            className={`w-full pl-9 ${
              isEdit ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Email</label>

        <div className="relative">
          <i className="pi pi-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <InputText
            value={formData.email}
            disabled={isEdit}
            placeholder="e.g. naresh@example.com"
            className={`w-full pl-9 ${
              isEdit ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>

      {!isEdit && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Password</label>

          <div className="relative">
            <i className="pi pi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <InputText
              type="password"
              value={formData.password}
              placeholder="Minimum 6 characters"
              className="w-full pl-9"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Role</label>

        <div className="relative">
          <i className="pi pi-id-card absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full pl-9 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select user role
            </option>
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
            <option value="viewer">Viewer</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          label={isEdit ? "Update User" : "Create User"}
          icon="pi pi-check"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className="bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
        />
      </div>
    </div>
  );
}
