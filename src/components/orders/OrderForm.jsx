import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";

import { useLazyGetApiQuery } from "../../store/slices/apiSclice";
import useAuth from "../../hooks/useAuth";

const OrderForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const canCreateOrder = user?.role === "sales";

  const [getProducts, { data: productsData, isFetching }] =
    useLazyGetApiQuery();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    productId: "",
    quantity: 1,
  });

  useEffect(() => {
    getProducts({ url: "/products" });
  }, []);

  const products =
    productsData?.data?.map((p) => ({
      label: `${p.name} (${p.sku})`,
      value: p._id,
    })) || [];

  const handleSubmit = () => {
    if (!canCreateOrder) return;

    onSubmit({
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      items: [
        {
          product: formData.productId,
          quantity: Number(formData.quantity),
        },
      ],
    });
  };

  const fieldClass = "w-full h-11 px-3 text-sm flex items-center";

  const labelClass = "text-sm font-medium text-gray-600";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <i className="pi pi-shopping-cart text-indigo-600 text-lg" />
        <h2 className="text-lg font-semibold">Order Information</h2>
      </div>

      <Divider />

      {/* Customer Name */}
      <div className="w-full space-y-1">
        <label className={labelClass}>Customer Name</label>
        <InputText
          placeholder="e.g. Naresh Kumar"
          value={formData.customerName}
          disabled={!canCreateOrder}
          className={fieldClass}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
        />
      </div>

      {/* Customer Email */}
      <div className="w-full space-y-1">
        <label className={labelClass}>Customer Email</label>
        <InputText
          placeholder="e.g. naresh@gmail.com"
          value={formData.customerEmail}
          disabled={!canCreateOrder}
          className={fieldClass}
          onChange={(e) =>
            setFormData({ ...formData, customerEmail: e.target.value })
          }
        />
      </div>

      {/* Product */}
      <div className="w-full space-y-1">
        <label className={labelClass}>Product</label>
        <Dropdown
          value={formData.productId}
          options={products}
          loading={isFetching}
          disabled={!canCreateOrder}
          placeholder="Select product"
          className="w-full h-11"
          panelClassName="text-sm"
          onChange={(e) => setFormData({ ...formData, productId: e.value })}
        />
      </div>

      {/* Quantity */}
      <div className="w-full space-y-1">
        <label className={labelClass}>Quantity</label>
        <InputText
          placeholder="e.g. 2"
          value={formData.quantity}
          disabled={!canCreateOrder}
          className={fieldClass}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
      </div>

      {/* Footer */}
      {canCreateOrder && (
        <div className="flex justify-end pt-4 border-t">
          <Button
            label="Create Order"
            icon="pi pi-check"
            onClick={handleSubmit}
            disabled={!formData.productId}
            className="bg-indigo-600 border-indigo-600 px-6 h-10"
          />
        </div>
      )}
    </div>
  );
};

export default OrderForm;
