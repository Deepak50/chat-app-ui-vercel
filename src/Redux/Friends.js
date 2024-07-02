import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
    name: "friends",
    initialState: {
        friends: []
    },
    reducers: {
        updateFriends: (state, action) => {
            let userChatMap = action.payload;
            console.log('userChatMap: ',userChatMap);
            let friendList = []
            userChatMap.forEach((item) => {
                console.log('item: ', item);
                let friend = {};
                friend.userId = item.userId;
                friend.userName = item.name;
                if (item.chats !== null && item.chats.length !== 0)
                    friend.sentDate = item.chats[0].sentTime;
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