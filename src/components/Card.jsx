import React, { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import protoTypes from "prop-types";
// import folderSlice from '../Redux/Slice/folderSlice';
import { task } from "../Redux/Slice/folderSlice";

export default function Card({ data, id }) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  function whenClicked() {
    setClicked(!clicked);
    dispatch(task({ isClicked: clicked, categoryId: id }));
  }

  return (
    <div className=" flex flex-col gap-3 checked:bg-primary">
      <div
        onClick={whenClicked}
        className=" flex flex-row gap-2 cursor-pointer "
      >
        <div className="">
          <FaFolderPlus className="text-xl  text-black font-bold hover:scale-110"></FaFolderPlus>
        </div>
        <div className="text-md font-semibold text-black">{data}</div>
      </div>
    </div>
  );
}
