import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";

import {
  useLazyGetApiQuery,
  usePostApiMutation,
} from "../../store/slices/apiSclice";
import Loader from "../../components/common/GlobelLoader";
import OrderForm from "../../components/orders/OrderForm";
import useAuth from "../../hooks/useAuth";

function OrdersPage() {
  const { user } = useAuth();

  const [getOrders, { data: ordersList, isLoading }] =
    useLazyGetApiQuery();
  const [createOrder, { isLoading: creating }] =
    usePostApiMutation();

  const [showDialog, setShowDialog] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // ✅ ONLY SALES CAN CREATE ORDERS
  const canCreateOrder = user?.role === "sales";

  useEffect(() => {
    getOrders({ url: "/orders" });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters({
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue(value);
  };

  const statusSeverity = (status) => {
    if (status === "pending") return "warning";
    if (status === "SUCCESS") return "success";
    if (status === "FAILED") return "danger";
    return "info";
  };

  return (
    <>
      <Loader show={isLoading || creating} />

      <div className="h-screen bg-white flex flex-col rounded-md">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-black/10 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Orders</h1>

          {canCreateOrder && (
            <Button
              label="Add Order"
              icon="pi pi-plus"
              onClick={() => setShowDialog(true)}
              className="bg-indigo-600 border-indigo-600 !text-white rounded-md px-4 py-2 font-medium gap-2"
            />
          )}
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-end mb-4">
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search orders..."
              className="p-inputtext-sm w-64"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <DataTable
              value={ordersList?.data || []}
              dataKey="_id"
              rowHover
              stripedRows
              paginator
              rows={5}
              emptyMessage="No orders found"
              filters={filters}
              globalFilterFields={[
                "customerName",
                "customerEmail",
                "status",
                "totalAmount",
              ]}
            >
              <Column field="customerName" header="Customer Name" />
              <Column field="customerEmail" header="Customer Email" />
              <Column field="totalAmount" header="Total Amount" />
              <Column
                field="status"
                header="Status"
                body={(row) => (
                  <Tag
                    value={row.status}
                    severity={statusSeverity(row.status)}
                  />
                )}
              />
            </DataTable>
          </div>
        </div>

        {canCreateOrder && (
          <Dialog
            header="Add Order"
            visible={showDialog}
            style={{ width: "520px" }}
            modal
            draggable={false}
            onHide={() => setShowDialog(false)}
          >
            <OrderForm
              onSubmit={async (data) => {
                await createOrder({
                  url: "/orders",
                  body: data,
                }).unwrap();

                setShowDialog(false);
                getOrders({ url: "/orders" });
              }}
            />
          </Dialog>
        )}
      </div>
    </>
  );
}

export default OrdersPage;
