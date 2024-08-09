import React from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { loginThunk } from "../Redux/Slice/userSlice";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Enter Email Here");
      return;
    }

    if (!password) {
      toast.error("Enter Password");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      //dispatch
      const response = await dispatch(
        loginThunk({ email: email, password: password })
      );

      if (response.payload?.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  return (
    <div className="flex justify-center items-center  bg-[#F5EDED] h-[100vh]">
      <form
        onSubmit={loginHandler}
        className="flex flex-col w-[400px] h-[65vh] bg-[#E2DAD6] shadow-2xl  shadow-[#EF5A6F] p-10 gap-5 mt-10 mb-10"
      >
        <div className="text-left text-2xl font-semibold text-black">Login</div>
        <div className="border border-[#45b06a]"></div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-serif  text-black">
            Email
          </label>
          <input
            id="email"
            type="email"
            // placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            className="p-3  bg-white shadow-lg rounded-xl outline-none "
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-serif text-black">
            Password
          </label>
          <input
            id="password"
            type="password"
            // placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
            className="p-3  bg-white shadow-lg rounded-xl outline-none "
          ></input>
        </div>

        <div className=" text-md text-black ">
          Don't have an account
          <span>
            {" "}
            <Link className=" link text-blue-500" to="/signup">
              Signup
            </Link>{" "}
          </span>
        </div>

        <button type="submit" className="btn bg-[#EF5A6F] text-white">
          Login
        </button>
      </form>
    </div>
  );
}
