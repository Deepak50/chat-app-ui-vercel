import React, { useEffect, useState } from 'react';
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
import { BACKEND_END_PT } from '../Constants';
import { getStompEndpoint } from '../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { update, updateStompClient } from '../Redux/LoggedInUser';
import { updateFriends } from '../Redux/Friends';
import { updateAllChat, updateCurrentChat, updateAllChatRealTime } from '../Redux/Chat';
import LoadingScreen from './LoadingScreen';

const Chat = ({ authCode, setAuthCode }) => {

    const { loggedInUser } = useSelector((state) => state.loggedInUser);
    var { stompClient } = useSelector((state) => state.loggedInUser);
    const { selectedUserName } = useSelector((state) => state.chat)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const liu  = null;

    const [friendId, setFriendId] = useState('');
    const [message, setMessage] = useState('');
    const [aChat, setAChat] = useState({});

    let updateAChat = (result) => {
        let allInfo = result;
        let tmpAchat = {};
        allInfo.forEach((item) => {
            tmpAchat[item.userId] = item.chats;
            console.log("this is htere: ", tmpAchat[item.userId]);
        });
        setAChat(tmpAchat);
        console.log('setAchat inside updateAChat: ', aChat, tmpAchat);
    }

    // useEffect when the page loads.
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
        console.log("printing here----------------------------------------------------------------------------=", loggedInUser.email);
    }, []);

    //useEffect whenever the aChat changes, the chats needs to be updated
    useEffect(()=>{
        dispatch(updateAllChatRealTime(aChat)); 
        dispatch(updateCurrentChat(aChat[selectedUserName]));
        
    },[aChat]);

    // useEffect after the user Logs in, (or when the user changes. Not used or tested though). The necessary API's are called only after confirming successful user login.
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        if (loggedInUser.email !== null && loggedInUser.email !== "") {
            fetch(BACKEND_END_PT + "/getEverything", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    updateAChat(result.data);
                    dispatch(updateFriends(result.data));
                    dispatch(updateAllChat(result.data));
                })
                .catch((error) => console.error(error));

        }
        //initialsize the stomp client
        stompClient = getStompEndpoint();
        dispatch(updateStompClient(stompClient));

        // connect to the logged in users end point where all other users will send messages to.
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(`/user/${loggedInUser.email}/msg`, function (message) {
                console.log("Message is recieved. Confirm.")
                console.log("A chat is : ",aChat);
                let msg = JSON.parse(message['body']);
                // todo
                console.log("msg is ", msg);
                // let tmp = aChat[selectedUserName];
                // tmp = [...tmp, msg];
                console.log("selected username: ", selectedUserName);
                setAChat(prevState => ({
                    ...prevState,
                    [msg['fromUser']['userId']]: [
                      ...(prevState[msg['fromUser']['userId']] || []),
                      msg
                    ]
                    
                  }));

                // aChat[selectedUserName] = [...aChat[selectedUserName], msg];
                console.log("aChat: ",aChat);
                // setAChat((a) => ({ ...a }));

                // dispatch(updateAllChatRealTime(aChat));
                // dispatch(updateCurrentChat(aChat[selectedUserName]));
            });
        })
    }, [loggedInUser])

    //api call when a new friend is added.
    const addFriend = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(BACKEND_END_PT + "/user/addFriend?friendId=" + friendId, requestOptions)
            .then((response) => { response.text(); window.location.reload(); })
            .catch((error) => console.error(error));
    }

    // api to send the message to another endpoint(ie. selected user end point)
    const sendToUser = (msg) => {
        setMessage('');
        let msgJson = {};
        msgJson = JSON.stringify({
            "chatId": null,
            "fromUser": {
                "userId": loggedInUser.email,
                "userName": loggedInUser.givenName,
                "email": null,
                "password": null,
                "active": null,
                "roles": null,
                "profilePic": null,
                "chats": [],
                "grps": [],
                "joinedDate": null
            },
            "toUser": {
                "userId": selectedUserName,
                "userName": selectedUserName,
                "email": null,
                "password": null,
                "active": null,
                "roles": null,
                "profilePic": null,
                "chats": [],
                "grps": [],
                "joinedDate": null
            },
            "chatDesc": msg,
            "sentTime": "2007-01-31T18:30:00.000+00:00",
            "deliveredTime": null,
            "seenTime": null
        })
        stompClient.send("/app/message", {}, JSON.stringify({
            'endpoint': 'endpoint',
            'to': selectedUserName,
            'message': msgJson
        }));

        // json object to save in db
        let jsonObj = JSON.stringify(
            {
                chatId: null,
                chatDesc: message,
                deliveredTime: null,
                seenTime: null,
                sentTime: null,
                fromUser: {
                    userId: loggedInUser.email
                },
                toUser: {
                    userId: selectedUserName
                }
            });

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            body: jsonObj,
            headers: myHeaders,
            redirect: "follow"
        };

        // behind the scene api that saves the chat in the db.
        fetch(BACKEND_END_PT + "/saveChat", requestOptions)
            .then((response) => response.json())
            .then((result) => {

            })
            .catch((error) => console.error(error));


        // not sure how this works. But it does. If you do it like this: setAChat(aChat); even though its the same thing, it wont work.
        // aChat[selectedUserName] = [...aChat[selectedUserName], JSON.parse(msgJson)];
        // setAChat((a) => ({ ...a }));

        setAChat(prevState => ({
            ...prevState,
            [selectedUserName]: [
              ...(prevState[selectedUserName] || []),
              JSON.parse(msgJson)
            ]
          }));

        // aChat[selectedUserName]= [];

          

        // dispatch(updateAllChatRealTime(aChat));
        // dispatch(updateCurrentChat(aChat[selectedUserName]));
    }
    
    if(loggedInUser.email == ''){
        return(
            <LoadingScreen/>
        );
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
                    <TextField value={message} fullWidth label="Type Here..." id="fullWidth" onChange={(e) => { setMessage(e.target.value); }} style={{ width: "71vw", border: "2px", borderColor: "black" }} />
                </Paper>
                <Fab color="primary" size='medium' style={{ position: "fixed", bottom: "0vh", right: "0px" }} onClick={(e) => { sendToUser(message) }}>
                    <SendSharpIcon style={{ ml: 0.70 }} />
                </Fab>
            </Stack>
        </>
    );
}

export default Chat;