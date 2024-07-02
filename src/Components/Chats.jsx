import * as React from 'react';
import List from '@mui/material/List';
import { Paper, Stack } from '@mui/material';
import './ALignItemsList.css'
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function Chats() {
    const { currentChat } = useSelector((state) => state.chat);
    const { loggedInUser } = useSelector((state) => state.loggedInUser);
    const messagesEndRef = React.useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [currentChat]);

    return (
        <Paper style={{ position: "fixed", left: "25vw", maxHeight: '83vh', overflow: 'auto', width: '75vw', bgcolor: "red", top: "10vh" }} className='example'>
            <List dense sx={{ width: '100%', bgcolor: 'white', border: 'none', boxShadow: 0 }}>
                {currentChat?.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.name}`;
                    if (value.fromUser.userId == loggedInUser.email) {
                        return (
                            <>
                                <ListItem style={{ maxWidth: "30vw", marginLeft: "auto" }}>
                                    <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                        <div style={{ marginLeft: 'auto', backgroundColor: "#ff6666", padding: "0.5rem", borderRadius: "10px" }}><div style={{ padding: "2px" }}>{value.chatDesc}</div></div>
                                    </Stack>
                                </ListItem>
                            </>
                        );
                    }
                    else {
                        return (
                            <>
                                <ListItem style={{ maxWidth: "30vw", marginRight: "auto" }}>
                                    <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                        <div style={{ marginRight: 'auto', backgroundColor: "#6699ff", padding: "0.5rem", borderRadius: "10px" }}><div style={{ padding: "2px" }}>{value.chatDesc}</div></div>
                                    </Stack>
                                </ListItem>
                                <div style={{ height: "3px" }}></div>
                            </>
                        )
                    }
                })}
            </List>
            <div ref={messagesEndRef} />
        </Paper>
    );
}