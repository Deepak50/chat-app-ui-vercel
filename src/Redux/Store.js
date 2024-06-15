import { configureStore } from '@reduxjs/toolkit'
import loggedInUser from './LoggedInUser';
import friends from './Friends';
import chat from './Chat';
export const store = configureStore({
  reducer: {
    friends: friends,
    loggedInUser: loggedInUser,
    chat:chat
  }
});