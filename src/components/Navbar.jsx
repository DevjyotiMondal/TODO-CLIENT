import { json, Link } from "react-router-dom";
import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../Redux/Slice/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar({ children }) {
  const userData = useSelector((state) => state.userSlice);
  console.log(userData);
  const isLoggedIn = userData.isLoggedIn;
  const avatar = userData.avatar;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout(e) {
    e.preventDefault();
    const res = await dispatch(logoutThunk());
    console.log(res);
    if (res.payload.statusCode === 200) {
      navigate("/");
    }
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TODO-LIST</a>
        </div>
        <div className="flex-none gap-2">
          <div>
            {JSON.parse(isLoggedIn )? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="rounded-full relative text-2xl">
                    {avatar ? (
                      <img src={avatar} alt="none"></img>
                    ) : (
                      <BsPersonCircle></BsPersonCircle>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <button
                    onClick={logout}
                    className="btn h-2 hover:bg-yellow-600 p-4 bg-yellow-400 text-black  "
                  >
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>

          {JSON.parse(isLoggedIn) ? (
            <button onClick={logout} className="btn btn-warning">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn  h-2 hover:bg-yellow-600 p-4 bg-yellow-400 text-black mr-10">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
