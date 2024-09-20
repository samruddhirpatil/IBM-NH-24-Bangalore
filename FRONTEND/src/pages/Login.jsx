import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-full
     md:w-[500px]"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          className="bg-blue-500 text-white  py-2 px-4 rounded hover:bg-blue-700"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;