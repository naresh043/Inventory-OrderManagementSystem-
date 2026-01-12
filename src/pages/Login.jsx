import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

import "../sytles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const toast = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      toast.current.show({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome back!",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail:
          err?.response?.data?.message || "Invalid email or password",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <Toast ref={toast} position="top-right" />

      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-xl rounded-xl p-6">
          <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
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
                w-full h-11 flex items-center justify-center gap-2
                bg-indigo-600 border-indigo-600
                hover:bg-indigo-700 hover:border-indigo-700
                focus:ring-2 focus:ring-indigo-400
                transition duration-200 rounded-md
              "
            >
              {loading ? (
                <>
                  <i className="pi pi-spin pi-spinner text-white" />
                  <span className="text-white font-medium">
                    Logging in...
                  </span>
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
    </>
  );
};

export default Login;
