import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
    name: "friends",
    initialState: {
        friends: []
    },
    reducers: {
        updateFriends: (state, action) => {
            let userChatMap = action.payload;
            let friendList = []
            userChatMap.forEach((item) => {
                let friend = {};
                friend.userId = item.userId;
                friend.userName = item.name;
                friend.profilePic = null;
                if (item.chats !== null && item.chats.length !== 0){
                    friend.profilePic = item.profilePic;
                    friend.sentDate = item.chats[0].sentTime;
                }
                else
                    friend.sentDate = null;
                
                friendList.push(friend)
            });
            state.friends = friendList;
        }
    },
})

export const { updateFriends } = friends.actions
export default friends.reducer