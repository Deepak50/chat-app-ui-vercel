import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppBar, Button } from '@material-ui/core';
import AlignItemsList from './AlignItemsList';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Chats from './Chats';
import './ALignItemsList.css'
import TestSocket from './TestSocket';
import { BACKEND_END_PT } from '../Constants';
import { ArrowDropDown } from '@mui/icons-material';
import { connect } from '../Utils/Utils';


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

    const [friendId, setFriendId] = useState('');
    const [people, setPeople] = useState('');

    const navigate = useNavigate();
    const classes = useStyles();
    var chatList = []

    useEffect(() => {
        if (sessionStorage.getItem('bearer') == null || sessionStorage.getItem('bearer') === 'null' || sessionStorage.getItem('bearer') === 'undefined') {
            // console.log("navigating back");
            navigate('/login');
        }
        else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            fetch(BACKEND_END_PT + "/getFriends", requestOptions)
                .then((response) => response.json())
                .then((result) => { setPeople(result.data); })
                .then(()=>{console.log(connect(people))})
                .catch((error) => console.error(error));            
        }


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        chatList = fetch(BACKEND_END_PT + "/getChatList/deepakkushalappa123@gmail.com", requestOptions)
            .then((response) => { response.text(); console.log("hello: ", myHeaders.get("Authorization")) })
            .catch((error) => console.error(error));
    }, []);


    const addFriend = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };


        fetch(BACKEND_END_PT + "/user/addFriend?friendId=" + friendId, requestOptions)
            .then((response) => { response.text(); })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Stack>
                <Stack>
                    <AppBar>
                        <Avatar src="https://media.geeksforgeeks.org/wp-content/uploads/20210604014825/QNHrwL2q-100x100.jpg" style={{ left: 10, height: "10vh", width: "4.5vw" }} />
                    </AppBar>
                </Stack>
                <Stack style={{ position: "fixed", top: '10vh' }} direction="row">
                    <TextField onChange={(event) => { setFriendId(event.target.value); }} ></TextField>
                    <Button onClick={addFriend} variant='contained' color='success'>Add friend+</Button>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={0} style={{ position: "fixed", top: "16vh" }}>
                <AlignItemsList />
                <Chats />
                <Paper style={{ position: 'fixed', bottom: 0, left: "25vw", right: 0, borderRadius: "10px", paddingLeft: "10px" }} elevation={3}>
                    <TextField fullWidth label="Type Here..." id="fullWidth" style={{ width: "71vw", border: "2px", borderColor: "black" }} />
                </Paper>
                <Fab color="primary" size='medium' style={{ position: "fixed", bottom: "0vh", right: "0px" }}>
                    <SendSharpIcon style={{ ml: 0.70 }} />
                </Fab>
            </Stack>
        </>
    );
}

export default Chat;