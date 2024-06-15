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
        }
    },
    reducers: {
        update: (state, action) => {
            state.loggedInUser.email = action.payload.username;
            state.loggedInUser.givenName = action.payload.givenName;
            state.loggedInUser.picture = action.payload.picture;
            state.loggedInUser.name = action.payload.name;
            state.loggedInUser.familyName = action.payload.familyName;
        },
        trial: (state, action)=>{

        }
    },
})

export const { update, trial } = loggedInUser.actions
export default loggedInUser.reducer