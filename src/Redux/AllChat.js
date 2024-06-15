import { createSlice } from "@reduxjs/toolkit";

export const allChat = createSlice({
    name: "allChat",
    initialState: {
        allChat: []
    },
    reducers: {
        updateAllChat: (state, action) => {
            state.chat = action.payload;
        }
    },
})

export const { updateAllChat } = chat.actions
export default chat.reducer