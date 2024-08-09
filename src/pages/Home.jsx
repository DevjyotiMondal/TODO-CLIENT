import { tasks } from "../Redux/Slice/userSlice";
import { folders } from "../Redux/Slice/userSlice";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiPlus, BiUpArrow } from "react-icons/bi";
import Tasks from "../components/Tasks";
import OngoingTask from "../components/OngoingTask";
import CompletedTask from "../components/CompletedTask";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { allFolders } from "../Redux/Slice/userSlice";
import Folders from "../components/Folders";
import ToDoList from "../components/ToDoList";
import SecondPart from "../components/SecondPart";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [folderss, setFolders] = useState([]);

  const [clicked, setClicked] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const isLoggedIn = useSelector((state) => state.userSlice).isLoggedIn;

  async function gettingAllFolders(e) {
    e.preventDefault();
    const res = await dispatch(allFolders());
    console.log(res.payload.data.category.category);
    if (res.payload.statusCode === 200) {
      navigate("/");
      setFolders(res.payload.data.category);
    }
  }

  async function createList() {
    const res = await dispatch(folders({ name: data }));
    console.log(res);
    if (res.payload.statusCode === 200) {
      setData("");
      setClicked(false);
    }
  }

  const folderStructure = useSelector((state) => state.folderSlice);
  console.log(folderStructure);
  const clickedOnFolder = folderStructure.isClicked;
  const catId = folderStructure.categoryId;
  const [ongoingTasks, setOngoingTasks] = useState([]);

  const gettingTasks = async () => {
    setShowTasks(!showTasks);
    const res = await dispatch(tasks());
    console.log(res.payload.data.onGoingTaskList);

    if (res.payload.statusCode === 200) {
      setOngoingTasks(res.payload.data.onGoingTaskList);
    }
  };

  return (
    <Navbar>
      <div className="bg-[#cbd5c8] h-[100vh] flex justify-center items-center">
        <div className=" bg-[#ffffff] h-[90vh]  shadow-xl w-full ml-10 mr-10 mt-5 mb-5 rounded-lg">
          <div className="grid grid-cols-[2fr_3fr_2.2fr] ">
            <div className="bg-[#f5f5f5] p-4 h-[90vh] relative  overflow-y-scroll">
              <div className=" flex flex-col gap-3">
                <div className="text-xl font-semibold text-black">Menu</div>
                <div className="">
                  <button
                    onClick={() => setClicked(!clicked)}
                    className=" btn bg-[#ffd43a] text-black font-semibold mt-5 hover:bg-yellow-300"
                  >
                    New List <BiPlus></BiPlus>{" "}
                  </button>
                </div>
                <button
                  onClick={gettingAllFolders}
                  className=" btn btn-primary text-black font-semibold mt-5 hover:bg-violet-500 w-fit"
                >
                  {" "}
                  Browse List{" "}
                </button>
                {clicked ? (
                  JSON.parse(isLoggedIn) ? (
                    <div className=" flex flex-row absolute bottom-0 items-center gap-3 mb-4">
                      <input
                        className=" input text-black w-full bg-[#ffffff]"
                        type="text"
                        onChange={(e) => setData(e.target.value)}
                      ></input>
                      <button
                        onClick={createList}
                        className=" btn bg-[#ffd43a] text-black font-semibold  hover:bg-yellow-300"
                      >
                        {" "}
                        Save
                      </button>
                    </div>
                  ) : (
                    navigate("/login")
                  )
                ) : (
                  ""
                )}

                {/* render all folder names */}

                <Folders></Folders>
              </div>
            </div>

            <div
              className={`${
                clickedOnFolder ? `bg-black p-4` : `bg-[#fafafa] p-4`} overflow-y-scroll h-[90vh]`}
            >
              <SecondPart clickedOnFolder={clickedOnFolder}></SecondPart>
            </div>

            <div className="bg-[#f5f5f5] p-4 h-[90vh] overflow-y-scroll flex flex-col gap-4 text-xl text-black font-semibold">
              <h1>Completed Task</h1>

              <CompletedTask></CompletedTask>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}