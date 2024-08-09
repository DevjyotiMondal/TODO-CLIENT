import React, { useState } from "react";
import Tasks from "./Tasks";
import { useDispatch, useSelector } from "react-redux";
// import { buttonStatus } from '../Redux/Slice/folderSlice';
import { editTask, removeTask } from "../Redux/Slice/taskSlice";
import { IoArrowBackCircle } from "react-icons/io5";
export default function Buttons({ edit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(true);

  const folderStructure = useSelector((state) => state.folderSlice);
  const catId = folderStructure.categoryId;
  const taskId = folderStructure.taskId;

  const [newTitle, setNewTitle] = useState("");

  const dispatch = useDispatch();

  const editData = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      editTask({
        taskId: taskId,
        newTitle: newTitle,
        categoryId: catId ? catId : "",
      })
    );
    console.log(res);
    if (res.payload.statusCode === 200) {
      setNewTitle("");
      setIsEdit(false);
    }
  };

  const deleteTask = async () => {
    const res = dispatch(removeTask({ taskId: taskId }));
    console.log(res);
  };

  return (
    <div>
      <button
        onClick={() => {
          if (edit) {
            setIsEdit(!isEdit);
          } else {
            deleteTask();
          }
        }}
        className={`btn ${edit ? `btn-success` : `btn-warning`}`}
      >
        {edit ? (
          isEdit ? (
            <IoArrowBackCircle className="text-3xl"></IoArrowBackCircle>
          ) : (
            "Edit"
          )
        ) : (
          "Delete"
        )}
      </button>

      {isEdit ? (
        <div className=" flex flex-row gap-3">
          <input
            className=" input bg-white "
            placeholder="Edit task"
            type="text "
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <button className=" btn btn-primary" onClick={editData}>
            Save
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
