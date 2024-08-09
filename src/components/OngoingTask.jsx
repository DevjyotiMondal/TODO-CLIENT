import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasks } from "../Redux/Slice/userSlice";
import Collapse from "./Collapse";

export default function OngoingTask({ taskList }) {
  const folderStructure = useSelector((state) => state.folderSlice);
  

  return (
    <div className=" mt-2">
      {
        <div className=" flex flex-col gap-2">
          {taskList
            ? taskList.map((item, idx) => {
                return <Collapse key={idx} idx={idx} item={item}></Collapse>;
              })
            : ""}
        </div>
      }
    </div>
  );
}
