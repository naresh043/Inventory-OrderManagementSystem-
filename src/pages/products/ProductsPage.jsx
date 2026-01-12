import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import ProductList from "../../components/products/ProductList";
import ProductForm from "../../components/products/ProductForm";
import { usePostApiMutation } from "../../store/slices/apiSclice";
import useAuth from "../../hooks/useAuth";

const ProductsPage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const toast = useRef(null);

  const { user } = useAuth();
  const [createProduct, { isLoading }] = usePostApiMutation();

  const canCreateProduct = user?.role === "admin";

  return (
    <div className="h-screen bg-white flex flex-col rounded-md">
      <Toast ref={toast} position="top-right" />

      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-black/10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>

        {canCreateProduct && (
          <Button
            label="Add Product"
            icon="pi pi-plus"
            loading={isLoading}
            onClick={() => setShowDialog(true)}
            className="bg-indigo-600 border-indigo-600 !text-white rounded-md px-4 py-2 font-medium gap-2"
          />
        )}
      </div>

      <div className="flex-1 overflow-auto p-1">
        <ProductList />
      </div>

      {canCreateProduct && (
        <Dialog
          header="Add Product"
          visible={showDialog}
          style={{ width: "500px" }}
          modal
          draggable={false}
          onHide={() => setShowDialog(false)}
        >
          <ProductForm
            onSubmit={async (data) => {
              try {
                await createProduct({
                  url: "/products",
                  body: {
                    name: data.name,
                    sku: `SKU-${Date.now()}`,
                    price: Number(data.price),
                    stockQuantity: Number(data.stock),
                    category: data.category,
                  },
                }).unwrap();
                toast.current.show({
                  severity: "success",
                  summary: "Product Added",
                  detail: "New product created successfully",
                  life: 3000,
                });

                setTimeout(() => {
                  setShowDialog(false);
                }, 300);
              } catch (error) {
                toast.current.show({
                  severity: "error",
                  summary: "Create Failed",
                  detail: "Unable to add product",
                  life: 3000,
                });
              }
            }}
          />
        </Dialog>
      )}
    </div>
  );
};

export default ProductsPage;
