const KpiCard = ({ title, value, danger }) => (
  <div
    className={`bg-white rounded-lg px-4 py-3 border w-full min-w-0 ${
      danger ? "border-red-200" : "border-gray-100"
    }`}
  >
    <p className="text-xs text-gray-500 leading-tight">
      {title}
    </p>

    <p
      className={`text-xl font-semibold leading-tight mt-1 ${
        danger ? "text-red-600" : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
);

export default KpiCard;
