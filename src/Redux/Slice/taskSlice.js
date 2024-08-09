import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState= {

}

// const loginThunk=createAsyncThunk(

// )
// const signupThunk=createAsyncThunk()
// const logoutThunk=createAsyncThunk()
// const taskList=createAsyncThunk()


export const addNewTask = createAsyncThunk("/task/add", async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/task/add-new-task", data),
        {
          loading: "Wait!!",
          success: (result) => {
            return result.data.message || "new Task is added";
          },
          error: (error) => {
            return error.response?.data?.message || "page is not opening";
          },
        }
      ); // Added await here
  
      return await res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  });
  export const editTask = createAsyncThunk("/task/edit", async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/task/editTask", data),
        {
          loading: "Wait!!",
          success: (result) => {
            return result.data.message || "new form is loaded";
          },
          error: (error) => {
            return error.response?.data?.message || "page is not opening";
          },
        }
      ); // Added await here
  
      return await res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  });

  export const removeTask = createAsyncThunk("/task/delete", async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/task/removeTask", data),
        {
          loading: "Wait! removing task",
          success: (result) => {
            return result.data.message || "task is removed"
          },
          error: (error) => {
            return error.response?.data?.message || "not removed";
          },
        }
      ); // Added await here
  
      return await res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  });

  export const finished = createAsyncThunk("/auth/finished", async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/task/completed", data),
        {
          loading: "Task Completed",
          success: (result) => {
            return result.data.message || ""
          },
          error: (error) => {
            return error.response?.data?.message || "not updating";
          },
        }
      ); // Added await here
  
      return await res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  });


const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{},

})


export default taskSlice.reducer
