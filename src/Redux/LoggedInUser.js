import { createSlice } from "@reduxjs/toolkit";

export const loggedInUser = createSlice({
    name: "loggedInUser",
    initialState: {
        loggedInUser: {
            "email": "",
            "givenName": "",
            "picture": "",
            "name": "",
            "familyName": ""
        },
        stompClient: null
    },
    reducers: {
        update: (state, action) => {
            state.loggedInUser.email = action.payload.username;
            state.loggedInUser.givenName = action.payload.givenName;
            state.loggedInUser.picture = action.payload.picture;
            state.loggedInUser.name = action.payload.name;
            state.loggedInUser.familyName = action.payload.familyName;
        },
        updateStompClient: (state, action) => {
            state.stompClient = action.payload;
        }
    },
})

export const { update, updateStompClient } = loggedInUser.actions
export default loggedInUser.reducer