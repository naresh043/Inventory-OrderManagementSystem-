import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";

import CurrentStockTable from "../../components/stocks/CurrentStockTable";
import StockHistoryTable from "../../components/stocks/StockHistoryTable";
import useAuth from "../../hooks/useAuth";

const StocksPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { user } = useAuth();

  const role = user?.role;

  const canViewCurrentStock =
    role === "admin" ||
    role === "sales" ||
    role === "warehouse" ||
    role === "viewer";

  const canViewStockHistory =
    role === "admin" ||
    role === "sales" ||
    role === "viewer";

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-black/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Stocks</h1>

          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search stocks..."
            className="p-inputtext-sm w-64"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 pt-4">
        <TabView className="stock-tabs">
          {canViewCurrentStock && (
            <TabPanel header="Current Stock">
              <CurrentStockTable globalFilter={globalFilter} />
            </TabPanel>
          )}

          {canViewStockHistory && (
            <TabPanel header="Stock History">
              <StockHistoryTable globalFilter={globalFilter} />
            </TabPanel>
          )}
        </TabView>
      </div>
    </div>
  );
};

export default StocksPage;
