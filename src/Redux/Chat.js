import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
    name: "chat",
    initialState: {
        selectedUserName: "",
        allChat: [],
        chat: []
    },
    reducers: {
        updateAllChat: (state, action) => {
            let allInfo = action.payload;
            state.allChat = {};
            allInfo.forEach((item)=>{
                let jsonObj = {};
                jsonObj[item.userId] = item.chats;
                state.allChat[item.userId] = item.chats;
                // .push(jsonObj);
            });
        },
        updateSelectedUserName: (state, action)=>{
            state.selectedUserName = action.payload
        },
        updateCurrentChat:(state, action)=>{
            let a = state.selectedUserName
            let b = state.allChat

            state.chat = b[a]
        }
    },
})

export const { updateAllChat, updateSelectedUserName, updateCurrentChat } = chat.actions
export default chat.reducer