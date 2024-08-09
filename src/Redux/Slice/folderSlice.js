import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isClicked:false,
    categoryId:null,
    taskId:null,
    isEdit:false,
    isDelete:false
}

const folderSlice = createSlice({
    initialState,
    name:'folder',
    reducers:{
        task:(state,action)=>{
            state.isClicked=action.payload.isClicked;
            state.categoryId=action.payload.categoryId;
          },
          getTaskId:(state,action)=>{
            state.taskId=action.payload.taskId;
          },
          buttonStatus:(state,action)=>{
            state.isEdit=action.payload.isEdit;
            state.isDelete= action.payload.isDelete;
          }
    }
        
    
})
export  const {task,getTaskId,buttonStatus} = folderSlice.actions
export default folderSlice.reducer