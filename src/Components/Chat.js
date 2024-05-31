import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppBar } from '@material-ui/core';
import AlignItemsList from './AlignItemsList';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Chats from './Chats';
import './ALignItemsList.css'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});



const Chat = ({ authCode, setAuthCode }) => {

    const navigate = useNavigate();
    const classes = useStyles();
    var chatList = []

    useEffect(() => {
        if (sessionStorage.getItem('bearer') == null || sessionStorage.getItem('bearer') === 'null' || sessionStorage.getItem('bearer') === 'undefined') {
            console.log("navigating back");
            navigate('/login');
        }


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        chatList = fetch("https://chatapp-zoa1.onrender.com/getChatList/deepakkushalappa123@gmail.com", requestOptions)
            .then((response) => { response.text(); console.log("hello: ", myHeaders.get("Authorization")) })
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <Stack>
                <AppBar>
                    <Avatar src="https://media.geeksforgeeks.org/wp-content/uploads/20210604014825/QNHrwL2q-100x100.jpg" style={{ left: 10, height: "10vh", width: "4.5vw" }} />
                </AppBar>
            </Stack>
            <Stack direction="row" spacing={0} style={{ position: "fixed", top: "10vh" }}>
                <AlignItemsList />
                <Chats />
                <Paper style={{ position: 'fixed', bottom: 0, left: "25vw", right: 0, borderRadius:"10px", paddingLeft:"10px"}} elevation={3}>
                    <TextField fullWidth label="Type Here..." id="fullWidth" style={{ width: "71vw", border: "2px" , borderColor:"black"}} />
                </Paper>
                <Fab color="primary" size='medium' style={{ position: "fixed", bottom: "0vh", right: "0px" }}>
                    <SendSharpIcon style={{ ml: 0.70 }} />
                </Fab>
            </Stack>
        </>
    );
}

export default Chat;