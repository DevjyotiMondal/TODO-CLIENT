import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasks } from "../Redux/Slice/userSlice";
import { BiArrowFromBottom, BiDownArrow } from "react-icons/bi";
import { BsFileArrowDown } from "react-icons/bs";
import CompletedTaskCard from "./CompletedTaskCard";

export default function CompletedTask() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [button, setButton] = useState(false);

  const getCompletedTasks = async () => {
    const res = await dispatch(tasks());
    console.log(res.payload.data.completedTasks);
    if (res.payload.statusCode === 200) {
      setList(res.payload.data.completedTasks);
      setButton(!button);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-3 ">
        <button onClick={getCompletedTasks} className=" btn btn-warning">
          My Tasks <BiDownArrow></BiDownArrow>
        </button>
        <div className=" text-lg text-pretty"></div>
      </div>

      {button ? (
        <div className=" flex flex-col gap-3">
          {list.map((item, idx) => {
            return (
              <div key={idx}>
                <CompletedTaskCard idx={idx} data={item}></CompletedTaskCard>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
