import { useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

import { useLazyGetApiQuery } from "../../store/slices/apiSclice";
import KpiCard from "../../components/dashboard/KpiCard";
import Loader from "../../components/common/GlobelLoader";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Dashboard = () => {
  const [getApi, { data, isLoading }] = useLazyGetApiQuery();
  const { user } = useContext(AuthContext);
  const role = user?.role;
  useEffect(() => {
    getApi({ url: "/dashboard/admin" });
  }, []);

  const d = data?.data;

  return (
    <div className="h-screen bg-white flex flex-col relative">
      <Loader show={isLoading} />

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-10 bg-white px-5 py-3 border-b border-black/10">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-gray-50">
        {/* ================= KPI ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {role === "admin" && (
            <>
              <KpiCard title="Total Users" value={d?.totalUsers} />
              <KpiCard title="Total Products" value={d?.totalProducts} />
            </>
          )}

          {(role === "admin" || role === "sales" || role === "viewer") && (
            <KpiCard title="Total Orders" value={d?.totalOrders} />
          )}

          {(role === "admin" || role === "warehouse" || role === "viewer") && (
            <KpiCard title="Low Stock" value={d?.lowStockCount} danger />
          )}
        </div>

        {/* ================= TABLES ================= */}
        <div className="grid xl:grid-cols-2 gap-5">
          {/* Orders Table */}
          {(role === "admin" || role === "sales" || role === "viewer") && (
            <Card title="Recent Orders" className="overflow-x-auto">
              <DataTable value={d?.recentOrders} stripedRows>
                <Column field="orderNumber" header="Order #" />
                <Column field="totalAmount" header="Amount" />
                <Column
                  field="status"
                  header="Status"
                  body={(row) => (
                    <Tag
                      value={row.status}
                      severity={
                        row.status === "shipped"
                          ? "success"
                          : row.status === "cancelled"
                          ? "danger"
                          : "warning"
                      }
                    />
                  )}
                />
              </DataTable>
            </Card>
          )}

          {/* Low Stock Table */}
          {(role === "admin" || role === "warehouse" || role === "viewer") && (
            <Card title="Low Stock Products" className="overflow-x-auto">
              <DataTable value={d?.lowStockProducts} stripedRows>
                <Column field="name" header="Product" />
                <Column field="stockQuantity" header="Stock" />
                <Column field="reorderLevel" header="Reorder Level" />
                <Column
                  header="Status"
                  body={() => <Tag value="LOW" severity="danger" />}
                />
              </DataTable>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
