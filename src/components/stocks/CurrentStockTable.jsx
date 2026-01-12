import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import { useLazyGetApiQuery } from "../../store/slices/apiSclice";
import UpdateStockModal from "./UpdateStockModal";
import Loader from "../common/GlobelLoader";
import useAuth from "../../hooks/useAuth";

const CurrentStockTable = ({ globalFilter }) => {
  const { user } = useAuth();

  const [getProducts, { data, isLoading }] = useLazyGetApiQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    getProducts({ url: "/products" });
  }, []);

  const refreshProducts = () => {
    getProducts({ url: "/products" });
  };

  const role = user?.role;

  const canUpdateStock = role === "warehouse";

  const stockStatusTemplate = (row) => {
    if (row.stockQuantity === 0)
      return <Tag value="Out of Stock" severity="danger" />;
    if (row.stockQuantity < 5)
      return <Tag value="Low Stock" severity="warning" />;
    return <Tag value="In Stock" severity="success" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Loader show={isLoading} />

      <DataTable
        value={data?.data || []}
        dataKey="_id"
        scrollable
        scrollHeight="calc(100vh - 330px)"
        size="small"
        rowHover
        stripedRows
        globalFilter={globalFilter}
        globalFilterFields={["sku", "name", "category"]}
        paginator
        rows={5}
        className="erp-table text-sm [&_.p-datatable-tbody>tr>td]:py-2"
        emptyMessage="No stock data found"
      >
        <Column field="name" header="Product" />
        <Column field="stockQuantity" header="Current Stock" />
        <Column header="Status" body={stockStatusTemplate} />

        {canUpdateStock && (
          <Column
            header="Action"
            body={(row) => (
              <Button
                icon="pi pi-plus"
                label="Update"
                className="bg-indigo-600 border-indigo-600 !text-white rounded-md px-4 py-2 font-medium gap-2"
                onClick={() => {
                  setSelectedProduct(row);
                  setShowUpdateModal(true);
                }}
              />
            )}
          />
        )}
      </DataTable>

      {canUpdateStock && (
        <UpdateStockModal
          visible={showUpdateModal}
          product={selectedProduct}
          onHide={() => setShowUpdateModal(false)}
          onSuccess={refreshProducts}
        />
      )}
    </div>
  );
};

export default CurrentStockTable;
