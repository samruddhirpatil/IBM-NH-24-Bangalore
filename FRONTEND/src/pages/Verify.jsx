import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
    const [otp, setOtp] = useState("");

    const { verifyUser, btnLoading } = UserData();

    const { fetchChats } = ChatData();

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        verifyUser(Number(otp), navigate, fetchChats);
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <form
                className="bg-white p-6 rounded shadow-md w-full
     md:w-[500px]"
                onSubmit={submitHandler}
            >
                <h2 className="text-2xl mb-4">Verify</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="otp">
                        Otp:
                    </label>
                    <input
                        type="number"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white  py-2 px-4 rounded hover:bg-blue-700">
                    {btnLoading ? <LoadingSpinner /> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Verify;