import React, { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, editTask } from "../Redux/Slice/taskSlice";
useSelector;

export default function Tasks() {
  const folderStructure = useSelector((state) => state.folderSlice);
  console.log(folderStructure);
  const catId = folderStructure.categoryId;
  const isEdit = folderStructure.isEdit;
  const taskId = folderStructure.taskId;

  const [data, setData] = useState({
    title: "",

    dateAdded: null,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    console.log(`${name}:${value}`);
  };

  const dispatch = useDispatch();
  const sendData = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      addNewTask({
        title: data.title,
        dateAdded: data.dateAdded,
        categoryId: catId ? catId : "",
      })
    );
    console.log(res);
    if (res.payload.statusCode === 200) {
      setData({ title: "", dateAdded: null });
    }
  };

  return (
    <div className={`border-b border-black p-5  `}>
      <div className={`w-full bg-white flex flex-row gap-4 items-center `}>
        <input
          className={`text-black w-full bg-[#f5f5f5] input input-md outline-none border-none `}
          type="text"
          placeholder="Add New Task"
          name="title"
          onChange={inputHandler}
        ></input>

        <label htmlFor="dateof"></label>
        <input
          type="date"
          className=" input bg-[#ffd43a] cursor-pointer"
          id="dateof"
          name="dateAdded"
          onChange={inputHandler}
        ></input>

        <button
          onClick={sendData}
          className=" btn bg-[#ffd43a] text-black font-semibold  hover:bg-yellow-300"
        >
          Save
        </button>
      </div>
    </div>
  );
}
Tasks.propTypes = {
  color: PropTypes.string,
};
