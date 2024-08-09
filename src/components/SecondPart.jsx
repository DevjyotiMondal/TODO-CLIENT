import { foldersTasks } from "../Redux/Slice/userSlice";
import React, { useState } from "react";
import Tasks from "./Tasks";
import { useDispatch, useSelector } from "react-redux";
import { tasks } from "../Redux/Slice/userSlice";
import { BiUpArrow } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";
import ToDoList from "./ToDoList";
import OngoingTask from "./OngoingTask";
export default function SecondPart({ clickedOnFolder }) {
  const [showTasks, setShowTasks] = useState(false);

  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [categoryTask, setCategoryTask] = useState([]);

  const dispatch = useDispatch();
  const folderStructure = useSelector((state) => state.folderSlice);
  console.log(folderStructure);
  const catId = folderStructure.categoryId;
  const isClicked = folderStructure.isClicked;
  const [click, setClick] = useState(isClicked);
  const gettingCategoryTasks = async () => {
    const res = await dispatch(foldersTasks({ folderId: catId }));
    console.log(res.payload.data.findFolder.tasks);
    //  setClick(!click)
    setCategoryTask(res.payload.data.findFolder.tasks);
  };

  const gettingTasks = async () => {
    setShowTasks(!showTasks);
    const res = await dispatch(tasks());
    console.log(res.payload.data.onGoingTaskList);

    if (res.payload.statusCode === 200) {
      setOngoingTasks(res.payload.data.onGoingTaskList);
    }
  };
  return (
    <>
      <div className="bg-[#fafafa] p-4">
        <ToDoList color={clickedOnFolder ? "black" : "white"}></ToDoList>

        {clickedOnFolder ? (
          <button
            onClick={gettingCategoryTasks}
            className="btn btn-success w-fit font-medium mt-3"
          >
            Ongoing Tasks{" "}
            {showTasks ? (
              <BiDownArrow className="text-lg "></BiDownArrow>
            ) : (
              <BiUpArrow className="text-lg"></BiUpArrow>
            )}{" "}
          </button>
        ) : (
          <button
            onClick={gettingTasks}
            className="btn btn-success w-fit font-medium mt-3"
          >
            Ongoing Tasks{" "}
            {showTasks ? (
              <BiDownArrow className="text-lg "></BiDownArrow>
            ) : (
              <BiUpArrow className="text-lg"></BiUpArrow>
            )}{" "}
          </button>
        )}
      </div>

      {isClicked ? (
        <OngoingTask taskList={isClicked ? categoryTask : ""}></OngoingTask>
      ) : (
        ""
      )}

      {showTasks ? (
        <OngoingTask taskList={isClicked ? "" : ongoingTasks}></OngoingTask>
      ) : (
        ""
      )}
    </>
  );
}
