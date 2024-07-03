import { createSlice } from "@reduxjs/toolkit";


export const chat = createSlice({
    name: "chat",
    initialState: {
        selectedUserName: "",
        allChat: {},
        currentChat: [],
        realtimeChat: [],
    },
    reducers: {
        updateAllChat: (state, action) => {
            let allInfo = action.payload;
            allInfo.forEach((item) => {
                state.allChat[item.userId] = item.chats;
            });
        },
        updateSelectedUserName: (state, action) => {
            state.selectedUserName = action.payload;
        },
        updateCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        updateAllChatRealTime: (state, action)=>{
            state.allChat = action.payload;
        }
    },
})

export const { updateAllChat, updateSelectedUserName, updateCurrentChat, updateAllChatRealTime } = chat.actions
export default chat.reducer