import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppBar, Button, Typography } from '@material-ui/core';
import AlignItemsList from './AlignItemsList';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import Chats from './Chats';
import './ALignItemsList.css'
import { BACKEND_END_PT } from '../Constants';
import { getStompEndpoint } from '../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../Redux/LoggedInUser';
import { updateFriends } from '../Redux/Friends';
import { updateAllChat, updateSelectedUserName, updateCurrentChat } from '../Redux/Chat';


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

    const { loggedInUser } = useSelector((state) => state.loggedInUser);
    const { friends } = useSelector((state) => state.friends);

    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [friendId, setFriendId] = useState('');

    var stompClient = null;

    useEffect(() => {
        if (sessionStorage.getItem('bearer') == null || sessionStorage.getItem('bearer') === 'null' || sessionStorage.getItem('bearer') === 'undefined') {
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
            console.log("Token: ", sessionStorage.getItem('bearer'));
            fetch(BACKEND_END_PT + "/getUsername", requestOptions)
                .then((response) => response.json())
                .then((result) => { dispatch(update(result)); })
                .catch((error) => console.log(error))
        }
    }, []);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        if (loggedInUser.email != null && loggedInUser.email != "") {
            fetch(BACKEND_END_PT + "/getEverything", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    dispatch(updateFriends(result.data));
                    dispatch(updateAllChat(result.data));
                })
                .catch((error) => console.error(error));

        }
        stompClient = getStompEndpoint();
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(`/user/${loggedInUser.email}/msg`, function (message) {
                // console.log("Subscribed username to :");
                // console.log("This msg is sent by: ", message['body']);
            });
        });
    }, [loggedInUser])


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

    const sendToUser = () => {
        stompClient.send("/app/message", {}, JSON.stringify({
            'endpoint': 'endpoint',
            'to': "deepakkushalappa50@gmail.com",
            'message': 'Hey deepak50'
        }));
    }

    return (
        <>
            <Stack>
                <Stack>
                    <AppBar>
                        <Avatar src={loggedInUser.picture} style={{ left: 10, height: "10vh", width: "4.5vw" }} />
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