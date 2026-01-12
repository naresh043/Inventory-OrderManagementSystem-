import { Card } from "primereact/card";

const DashboardCard = ({ title, value, danger }) => {
  return (
    <Card
      className={`text-center border-l-4 ${
        danger ? "border-red-500" : "border-blue-500"
      }`}
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p
        className={`text-3xl font-bold ${
          danger ? "text-red-600" : ""
        }`}
      >
        {value}
      </p>
    </Card>
  );
};

export default DashboardCard;
