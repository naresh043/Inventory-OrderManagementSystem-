import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { useUpdateApiMutation } from "../../store/slices/apiSclice";

const changeTypes = [
  { label: "Restock", value: "restock" },
  { label: "Sale", value: "sale" },
  { label: "Damage", value: "damage" },
  { label: "Adjustment", value: "adjustment" },
  { label: "Return", value: "return" },
];

const UpdateStockModal = ({ visible, onHide, product, onSuccess }) => {
  const [updateStock, { isLoading }] = useUpdateApiMutation();

  const [form, setForm] = useState({
    changeType: null,
    quantityChanged: 0,
    reason: "",
  });

  const submitHandler = async () => {
    await updateStock({
      url: "/stock/update",
      data: {
        productId: product._id,
        ...form,
      },
    });
    onSuccess();
    onHide();
  };

  if (!product) return null;

  return (
    <Dialog
      header="Update Stock"
      visible={visible}
      onHide={onHide}
      style={{ width: "420px" }}
      modal
    >
      <div className="space-y-4">
        <InputText value={product.name} disabled />

        <Dropdown
          value={form.changeType}
          options={changeTypes}
          onChange={(e) => setForm({ ...form, changeType: e.value })}
          placeholder="Select Change Type"
          className="w-full"
        />

        <InputNumber
          value={form.quantityChanged}
          onValueChange={(e) => setForm({ ...form, quantityChanged: e.value })}
          placeholder="Quantity (+ / -)"
          className="w-full"
        />

        <InputText
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          placeholder="Reason (optional)"
          className="w-full"
        />

        <div className="flex justify-end gap-2">
          <Button label="Cancel" outlined onClick={onHide} />
          <Button label="Update" loading={isLoading} onClick={submitHandler} />
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateStockModal;
