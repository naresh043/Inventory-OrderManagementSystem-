import { ClipLoader } from "react-spinners";

const Loader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="overlay-loader">
      <ClipLoader size={40} color="#1976d2" />
    </div>
  );
};

export default Loader;
