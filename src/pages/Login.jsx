import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

// PrimeReact
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "../sytles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res?.data);
      navigate("/")
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl p-6">
        {/* Title */}
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

         
         {/* Password */}
<div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-600">
    Password
  </label>

  <Password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  toggleMask
  feedback={false}
  className="w-full"
/>

</div>


          <Button
            type="submit"
            disabled={loading}
            className="
    w-full
    h-11
    flex
    items-center
    justify-center
    gap-2
    bg-indigo-600
    border-indigo-600
    hover:bg-indigo-700
    hover:border-indigo-700
    focus:ring-2
    focus:ring-indigo-400
    transition
    duration-200
    rounded-md
  "
          >
            {loading ? (
              <>
                <i className="pi pi-spin pi-spinner text-white" />
                <span className="text-white font-medium">Logging in...</span>
              </>
            ) : (
              <>
                <i className="pi pi-sign-in text-white" />
                <span className="text-white font-medium">Login</span>
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
