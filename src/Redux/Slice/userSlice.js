import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || "false",
  avatar: localStorage.getItem("avatar"),
  taskList: JSON.parse(localStorage.getItem("tasks")) || [],
  completedList: JSON.parse(localStorage.getItem("CompletedTasks")) || [],
  folders: JSON.parse(localStorage.getItem("folders")) || [],
};

export const signupThunk = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/signup", data), {
      loading: "Wait! creating your account",
      success: (result) => {
        return result.data.message || "Account is created Successfully";
      },
      error: (error) => {
        return error.response?.data?.message || "account is not created";
      },
    }); // Added await here

    return await res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

export const loginThunk = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/login", data), {
      loading: "Wait! Logging In",
      success: (result) => {
        return result.data.message || "Logged In";
      },
      error: (error) => {
        return error.response?.data?.message || "error occuring while logging";
      },
    }); // Added await here

    return await res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

export const logoutThunk = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/logout"), {
      loading: "Wait! logged out",
      success: (result) => {
        return result.data.message || "Logged out";
      },
      error: (error) => {
        return error.response?.data?.message || "Logged out";
      },
    }); // Added await here

    return await res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

export const tasks = createAsyncThunk("/auth/task", async () => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/tasks"), {
      loading: "getting list",
      success: (result) => {
        return result.data.message || "";
      },
      error: (error) => {
        return error.response?.data?.message || "list not got";
      },
    }); // Added await here

    return await res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

export const folders = createAsyncThunk("/auth/folder-add", async (data) => {
  try {
    const res = await toast.promise(
      axiosInstance.post("/user/new-folder", data),
      {
        loading: "Creating folder",
        success: (result) => {
          return result.data.message || "";
        },
        error: (error) => {
          return error.response?.data?.message || "folder is not created";
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

export const foldersTasks = createAsyncThunk(
  "/auth/folder-add-task",
  async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/user/folder-tasks", data),
        {
          loading: "Getting all the tasks",
          success: (result) => {
            return result.data.message || "";
          },
          error: (error) => {
            return error.response?.data?.message || "tasks not got";
          },
        }
      ); // Added await here

      return await res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const allFolders = createAsyncThunk("/auth/folder-all", async () => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/all-folders"), {
      loading: "Getting all the Folders",
      success: (result) => {
        return result.data.message || "";
      },
      error: (error) => {
        return error.response?.data?.message || "not getting all folders";
      },
    }); // Added await here

    return await res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log(action.payload.data.userInDB);
        const userData = action.payload.data.userInDB;

        console.log(state.isLoggedIn);

        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "false");

        state.avatar = userData.avatar;
        localStorage.setItem("avatar", userData.avatar);

        state.completedList = userData.listOfCompleted;

        localStorage.setItem(
          "CompletedTasks",
          JSON.stringify(userData.listOfCompleted)
        );

        state.taskList = userData.onGoingTask;

        localStorage.setItem("tasks", JSON.stringify(userData.onGoingTask));
      })
      .addCase(allFolders.fulfilled, (state, action) => {
        console.log(action.payload.data.category.category);
        localStorage.setItem(
          "folders",
          JSON.stringify(action.payload.data.category.category)
        );
      })

      .addCase(logoutThunk.fulfilled, (state, action) => {
        localStorage.clear();
        state.avatar = "";
        state.completedList = [];
        state.folders = [];
        state.taskList = [];
        state.isLoggedIn = false;
      })
      .addCase(tasks.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default authSlice.reducer;
