import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import ProductList from "../../components/products/ProductList";
import ProductForm from "../../components/products/ProductForm";
import { usePostApiMutation } from "../../store/slices/apiSclice";
import useAuth from "../../hooks/useAuth";

const ProductsPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const { user } = useAuth();
  const [createProduct, { isLoading }] = usePostApiMutation();

  const canCreateProduct = user?.role === "admin";

  return (
    <div className="h-screen bg-white flex flex-col rounded-md">
 
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

      {/* ================= PRODUCT LIST ================= */}
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

              setShowDialog(false);
            }}
          />
        </Dialog>
      )}
    </div>
  );
};

export default ProductsPage;
