import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

const ProductDetails = ({ product }) => {
  const inStock = product.stockQuantity > 0;

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            SKU: <span className="font-medium">{product.sku}</span>
          </p>
        </div>

        <Tag
          value={inStock ? "In Stock" : "Out of Stock"}
          severity={inStock ? "success" : "danger"}
          className="px-3 py-1 text-xs"
        />
      </div>

      <Divider className="!my-2" />

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Category */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-100">
            <i className="pi pi-tags text-indigo-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <p className="font-medium text-gray-800">
              {product.category}
            </p>
          </div>
        </div>

        {/* Stock Quantity */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-100">
            <i className="pi pi-box text-green-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Stock Quantity</p>
            <p className="font-medium text-gray-800">
              {product.stockQuantity}
            </p>
          </div>
        </div>

        {/* Reorder Level */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-100">
            <i className="pi pi-exclamation-triangle text-orange-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Reorder Level</p>
            <p className="font-medium text-gray-800">
              {product.reorderLevel}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500 mb-1">Status</p>
          <Tag
            value={inStock ? "Available" : "Out of Stock"}
            severity={inStock ? "success" : "danger"}
            className="px-3 py-1 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
