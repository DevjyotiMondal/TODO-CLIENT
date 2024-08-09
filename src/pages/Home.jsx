import { tasks, folders, allFolders } from "../Redux/Slice/userSlice";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Tasks from "../components/Tasks";
import OngoingTask from "../components/OngoingTask";
import CompletedTask from "../components/CompletedTask";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Folders from "../components/Folders";
import SecondPart from "../components/SecondPart";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [folderss, setFolders] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);

  // Function to get all folders
  async function gettingAllFolders(e) {
    if (e) e.preventDefault();
    const res = await dispatch(allFolders());
    if (res.payload.statusCode === 200) {
      setFolders(res.payload.data.category);
    }
  }

  // UseEffect to initialize folders on mount
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
      gettingAllFolders();
    }
  }, []);

  // Function to create a new list
  async function createList() {
    const res = await dispatch(folders({ name: data }));
    if (res.payload.statusCode === 200) {
      setData("");
      setClicked(false);
      gettingAllFolders(); // Refresh folder list after creating a new list
    }
  }

  // Function to get ongoing tasks
  const gettingTasks = async () => {
    setShowTasks(!showTasks);
    const res = await dispatch(tasks());
    if (res.payload.statusCode === 200) {
      setOngoingTasks(res.payload.data.onGoingTaskList);
    }
  };

  // Handle authentication state
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  return (
    <Navbar>
      <div className="bg-[#cbd5c8] h-[100vh] flex justify-center items-center">
        <div className="bg-[#ffffff] h-[90vh] shadow-xl w-full ml-10 mr-10 mt-5 mb-5 rounded-lg">
          <div className="grid grid-cols-[2fr_3fr_2.2fr]">
            <div className="bg-[#f5f5f5] p-4 h-[90vh] relative overflow-y-scroll">
              <div className="flex flex-col gap-3">
                <div className="text-xl font-semibold text-black">Menu</div>
                <div className="">
                  <button
                    onClick={() => setClicked(!clicked)}
                    className="btn bg-[#ffd43a] text-black font-semibold mt-5 hover:bg-yellow-300"
                  >
                    New List <BiPlus />
                  </button>
                </div>
                <button
                  onClick={gettingAllFolders}
                  className="btn btn-primary text-black font-semibold mt-5 hover:bg-violet-500 w-fit"
                >
                  Browse List
                </button>
                {clicked && JSON.parse(localStorage.getItem('isLoggedIn')) ? (
                  <div className="flex flex-row absolute bottom-0 items-center gap-3 mb-4">
                    <input
                      className="input text-black w-full bg-[#ffffff]"
                      type="text"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                    <button
                      onClick={createList}
                      className="btn bg-[#ffd43a] text-black font-semibold hover:bg-yellow-300"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  navigate("/login")
                )}

                {/* render all folder names */}
                <Folders folders={folderss} />
              </div>
            </div>

            <div
              className={`${
                clickedOnFolder ? `bg-black p-4` : `bg-[#fafafa] p-4`
              } overflow-y-scroll h-[90vh]`}
            >
              <SecondPart clickedOnFolder={clickedOnFolder} />
            </div>

            <div className="bg-[#f5f5f5] p-4 h-[90vh] overflow-y-scroll flex flex-col gap-4 text-xl text-black font-semibold">
              <h1>Completed Task</h1>
              <CompletedTask />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
