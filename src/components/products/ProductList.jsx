import { useEffect, useState, useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";

import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import Loader from "../common/GlobelLoader";

import {
  useLazyGetApiQuery,
  useDeleteApiMutation,
  useUpdateApiMutation,
} from "../../store/slices/apiSclice";

import useAuth from "../../hooks/useAuth";

export default function ProductList() {
  const { user } = useAuth();
  const toast = useRef(null);

  const [getProducts, { data, isFetching }] = useLazyGetApiQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteApiMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateApiMutation();

  const products = data?.data || [];

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("view");
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    setFilters({
      global: { value: searchValue, matchMode: FilterMatchMode.CONTAINS },
    });
  }, [searchValue]);
 
  useEffect(() => {
    getProducts({ url: "/products" });
  }, []);

  const loading = isFetching || isDeleting || isUpdating;

  const canEdit =
    user?.role === "admin" || user?.role === "warehouse";

  const canDelete = user?.role === "admin";

  /* QUANTITY BADGE */
  const quantityTemplate = (row) => {
    const severity =
      row.stockQuantity === 0
        ? "danger"
        : row.stockQuantity <= row.reorderLevel
        ? "warning"
        : "success";

    return (
      <Tag
        value={row.stockQuantity}
        severity={severity}
        className="px-3 py-1 text-xs font-medium rounded-full"
      />
    );
  };

  /* ACTIONS */
  const actionTemplate = (row) => (
    <div className="flex items-center gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-text p-button-sm text-blue-600"
        onClick={() => {
          setSelectedProduct(row);
          setDialogMode("view");
          setDialogVisible(true);
        }}
      />

      {canEdit && (
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-button-sm text-green-600"
          onClick={() => {
            setSelectedProduct(row);
            setDialogMode("edit");
            setDialogVisible(true);
          }}
        />
      )}

      {canDelete && (
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-sm text-red-600"
          onClick={async () => {
            try {
              await deleteProduct({
                url: `/products/${row._id}`,
              }).unwrap();

              toast.current.show({
                severity: "success",
                summary: "Product Deleted",
                detail: "Product removed successfully",
                life: 3000,
              });

              getProducts({ url: "/products" });
            } catch (error) {
              toast.current.show({
                severity: "error",
                summary: "Delete Failed",
                detail: "Unable to delete product",
                life: 3000,
              });
            }
          }}
        />
      )}
    </div>
  );

  return (
    <>
      {/* ✅ Toast */}
      <Toast ref={toast} position="top-right" />

      <div className="flex justify-end px-1 py-1 border-b border-gray-200">
        <span className="p-input-icon-left">
          <i className="pi pi-search text-gray-400 ml-5" />
          <InputText
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="w-64 pl-10 h-10"
          />
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Loader show={loading} />

        <DataTable
          value={products}
          dataKey="_id"
          scrollable
          scrollHeight="calc(100vh - 260px)"
          size="small"
          paginator
          rows={5}
          stripedRows
          rowHover
          filters={filters}
          globalFilterFields={["sku", "name", "category"]}
          emptyMessage="No products found"
          className="erp-table text-sm [&_.p-datatable-tbody>tr>td]:py-2"
        >
          <Column field="sku" header="SKU" sortable />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column header="Quantity" body={quantityTemplate} />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>

        {/* DIALOG */}
        <Dialog
          header={dialogMode === "view" ? "Product Details" : "Edit Product"}
          visible={dialogVisible}
          style={{ width: "480px" }}
          modal
          draggable={false}
          onHide={() => {
            setDialogVisible(false);
            setSelectedProduct(null);
          }}
        >
          {selectedProduct && dialogMode === "view" && (
            <ProductDetails product={selectedProduct} />
          )}

          {selectedProduct && dialogMode === "edit" && canEdit && (
            <ProductForm
              initialData={{
                name: selectedProduct.name,
                price: selectedProduct.price,
                stock: selectedProduct.stockQuantity,
                category: selectedProduct.category,
              }}
              onSubmit={async (formData) => {
                try {
                  await updateProduct({
                    url: `/products/${selectedProduct._id}`,
                    data: {
                      name: formData.name,
                      price: Number(formData.price),
                      stockQuantity: Number(formData.stock),
                      category: formData.category,
                    },
                  }).unwrap();

                  toast.current.show({
                    severity: "success",
                    summary: "Product Updated",
                    detail: "Product updated successfully",
                    life: 3000,
                  });

                  getProducts({ url: "/products" });

                  setTimeout(() => {
                    setDialogVisible(false);
                  }, 500);
                } catch (error) {
                  toast.current.show({
                    severity: "error",
                    summary: "Update Failed",
                    detail: "Unable to update product",
                    life: 3000,
                  });
                }
              }}
            />
          )}
        </Dialog>
      </div>
    </>
  );
}
