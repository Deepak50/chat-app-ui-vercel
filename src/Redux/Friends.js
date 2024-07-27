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
                friend.profilePic = item.profilePic;
                // console.log("pp:+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++== ", friend.profilePic, " ", item)
                if (item.chats !== null && item.chats.length !== 0){
                    console.log("pp: ", item.userId);
                    if(item.chats[0].fromUser == item.userId){
                        friend.profilePic = item.chats[0].fromUser.profilePic
                    }
                    else{
                        friend.profilePic = item.chats[0].toUser.profilePic
                    }
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