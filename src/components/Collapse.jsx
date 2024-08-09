import React, { useState } from "react";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getTaskId } from "../Redux/Slice/folderSlice";
import { finished } from "../Redux/Slice/taskSlice";

export default function Collapse({ idx, item }) {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState(false);
  const categoryId = useSelector((state) => state.folderSlice).categoryId;

  function fetchId() {
    dispatch(getTaskId({ taskId: item._id }));
  }

  const isFinished = async (e) => {
    const res = await dispatch(
      finished({ taskId: item._id, catId: categoryId })
    );
    console.log(res);
  };

  return (
    <div className="bg-base-200 collapse" onClick={fetchId}>
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Task {idx}
      </div>
      <div className="collapse-content  bg-secondary text-primary-content peer-checked:bg-zinc-300  peer-checked:text-secondary-content">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center mt-3">
            <div className="">
              <input
                className=" checkbox-accent cursor-pointer"
                type="checkbox"
                name="taskId"
                onClick={isFinished}
                value={item._id}
              ></input>
            </div>

            <div className=" text-lg font-semibold ">{item.title}</div>
          </div>

          <div className=" flex flex-row gap-5">
            <Buttons edit={true}></Buttons>
            <Buttons edit={false}></Buttons>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-bold text-blue-500 font-medium">
              {" "}
              {new Date(item.dateAdded).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
