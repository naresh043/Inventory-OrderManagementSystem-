import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useLazyGetApiQuery } from "../../store/slices/apiSclice";
import Loader from "../common/GlobelLoader";

const StockHistoryTable = ({ globalFilter }) => {
  const [getLogs, { data, isLoading }] = useLazyGetApiQuery();

  useEffect(() => {
    getLogs({ url: "/stock/logs" });
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* ✅ GLOBAL LOADER */}
      <Loader show={isLoading} />

      <DataTable
        value={data?.data || []}
        dataKey="_id"
        scrollable
        scrollHeight="calc(100vh - 320px)"
        size="small"
        rowHover
        stripedRows
        globalFilter={globalFilter}
        globalFilterFields={[
          "productName",
          "changeType",
          "reason",
          "performedBy.name",
        ]}
        paginator
        rows={5}
        className="erp-table text-sm [&_.p-datatable-tbody>tr>td]:py-2"
        emptyMessage="No stock history found"
      >
        <Column field="createdAt" header="Date" />
        <Column field="productName" header="Product" />
        <Column field="changeType" header="Type" />
        <Column field="quantityBefore" header="Before" />
        <Column field="quantityChanged" header="Change" />
        <Column field="quantityAfter" header="After" />
        <Column field="reason" header="Reason" />
        <Column header="By" body={(row) => row.performedBy?.name} />
      </DataTable>
    </div>
  );
};

export default StockHistoryTable;
