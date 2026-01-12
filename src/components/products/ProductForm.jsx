import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";

import { validateProduct } from "../../utils/validators";

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const categories = [
    { label: "Electronics", value: "Electronics" },
    { label: "Accessories", value: "Accessories" },
    { label: "Furniture", value: "Furniture" },
  ];

  const [values, setValues] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    category: initialData.category || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errs = validateProduct(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(values);
  };

  const isButtonDisabled =
    !values.name || !values.price || !values.stock || !values.category;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <i className="pi pi-box text-indigo-600 text-lg" />
        <h2 className="text-lg font-semibold text-gray-900">
          Product Information
        </h2>
      </div>

      <Divider className="!my-2" />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">
          Product Name
        </label>

        <div className="relative">
          <i className="pi pi-tag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <InputText
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g. Wireless Mouse"
            className={`w-full pl-9 ${errors.name ? "p-invalid" : ""}`}
          />
        </div>

        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Price</label>

          <div className="relative">
            <i className="pi pi-wallet absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <InputText
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="e.g. 1499"
              className={`w-full pl-9 ${errors.price ? "p-invalid" : ""}`}
            />
          </div>

          {errors.price && (
            <p className="text-xs text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Category</label>

          <Dropdown
            value={values.category}
            options={categories}
            onChange={(e) => setValues({ ...values, category: e.value })}
            placeholder="Choose a category"
            className={`w-full ${errors.category ? "p-invalid" : ""}`}
          />

          {errors.category && (
            <p className="text-xs text-red-500">{errors.category}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Stock Quantity
          </label>

          <div className="relative">
            <i className="pi pi-database absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <InputText
              name="stock"
              value={values.stock}
              onChange={handleChange}
              placeholder="e.g. 50"
              className={`w-full pl-9 ${errors.stock ? "p-invalid" : ""}`}
            />
          </div>

          {errors.stock && (
            <p className="text-xs text-red-500">{errors.stock}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          label="Save Product"
          icon="pi pi-save"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className="bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
        />
      </div>
    </div>
  );
};

export default ProductForm;
