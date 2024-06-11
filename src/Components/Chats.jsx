import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Divider, Paper, Stack } from '@mui/material';
import './ALignItemsList.css'
import ListItem from '@mui/material/ListItem';

export default function Chats() {

    const people = [
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName is the name of the employee in the capital letters of the english alphabets",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "Suresh",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "Akshay",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "Ramesh",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName is the name of the employee in the capital letters of the english alphabets",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            lastMsgTime: "30/05/2024"
        },

        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName is the name of the employee in the capital letters of the english alphabets",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        },
        {
            name: "SomeName",
            lastMsgTime: "30/05/2024"
        }
    ]
    return (
        <Paper style={{ position: "fixed", left: "25vw",maxHeight: '83vh', overflow: 'auto', width: '75vw', bgcolor: "red", top: "10vh"}} className='example'>
            <List dense sx={{ width: '100%', bgcolor: '#ffffe6' }}>
                {people.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.name}`;
                    return (
                        <>
                            <ListItemButton style={{ maxWidth: "30vw", marginLeft: "auto" }}>
                                <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                    <div style={{ marginLeft: 'auto', backgroundColor: "#ff6666", padding: "0.5rem", borderRadius: "10px"}}><div style={{ padding: "2px" }}>{value.name}</div></div>
                                </Stack>
                            </ListItemButton>

                            <ListItem style={{ maxWidth: "30vw", marginRight: "auto" }}>
                                <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                    <div style={{ marginRight: 'auto', backgroundColor: "#6699ff", padding: "0.5rem", borderRadius: "10px"}}><div style={{ padding: "2px" }}>{value.name}</div></div>
                                </Stack>
                            </ListItem>
                            <div style={{ height: "3px" }}></div>
                        </>
                    );
                })}
            </List>
        </Paper>
    );
}