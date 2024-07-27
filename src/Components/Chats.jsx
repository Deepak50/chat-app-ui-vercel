import * as React from 'react';
import List from '@mui/material/List';
import { Paper, Stack } from '@mui/material';
import './ALignItemsList.css'
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Avatar, ListItemIcon } from '@material-ui/core';


export default function Chats() {
    const { currentChat } = useSelector((state) => state.chat);
    const { loggedInUser } = useSelector((state) => state.loggedInUser);
    const messagesEndRef = React.useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [currentChat]);

    return (
        <div style={{ position: "fixed", left: "25vw", maxHeight: '83vh', overflow: 'auto', width: '75vw', top: "10vh" }}> <List dense sx={{ width: '100%', bgcolor: 'white', border: 'none', boxShadow: 0 }}>
            {currentChat?.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.name}`;
                const d = new Date(value.sentTime);
                if (value.fromUser.userId == loggedInUser.email) {
                    return (
                        <>
                            <ListItem style={{ maxWidth: "30vw", marginLeft: "auto" }}>
                                <div style={{ marginLeft: 'auto', backgroundColor: "#ff6666", padding: "0.5rem", borderRadius: "10px" }}>
                                    <div>{value.chatDesc}</div>
                                    <div style={{ fontSize: "10px", color: "white" }}>
                                        {d.toLocaleString()}
                                    </div>
                                </div>
                                <Avatar alt="Remy Sharp" src={value.fromUser.profilePic} style={{  maxWidth: "35px", maxHeight: "35px" }} />
                            </ListItem>
                        </>
                    );
                }
                else {
                    return (
                        <>
                            <ListItem style={{ maxWidth: "30vw", marginRight:"auto" }}>
                                <Avatar alt="Remy Sharp" src={value.fromUser.profilePic} style={{ marginLeft: "0px", maxWidth: "35px", maxHeight: "35px" }} />
                                <div style={{ marginRight: 'auto', backgroundColor: "#6699ff", padding: "0.5rem", borderRadius: "10px" }}>
                                    <div style={{ padding: "2px" }}>
                                        {value.chatDesc}
                                    </div>
                                    <div style={{ fontSize: "10px", color: "white" }}>
                                        {d.toLocaleString()}
                                    </div>
                                </div>
                            </ListItem>
                            <div style={{ height: "3px" }}></div>
                        </>
                    )
                }
            })}
        </List>
            <div ref={messagesEndRef} />
        </div>
    );
}