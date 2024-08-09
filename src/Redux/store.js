import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './Slice/userSlice'
import taskSliceReducer from "./Slice/taskSlice";
import folderSliceReducer from "./Slice/folderSlice";

const store = configureStore({
    reducer:{
        userSlice:userSliceReducer,
        taskSlice:taskSliceReducer,
        folderSlice:folderSliceReducer
    }
})

export default store