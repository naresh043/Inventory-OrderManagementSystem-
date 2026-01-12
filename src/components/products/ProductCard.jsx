import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

const ProductCard = ({ product }) => {
  const stockSeverity =
    product.stock === 0 ? "danger" :
    product.stock < 10 ? "warning" : "success";

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <Tag
          value={product.stock === 0 ? "Out of Stock" : "In Stock"}
          severity={stockSeverity}
          className="text-xs"
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <i className="pi pi-wallet text-indigo-500" />
          ₹ {product.price}
        </p>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <i className="pi pi-box text-emerald-500" />
          Stock: {product.stock}
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
