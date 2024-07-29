import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Tag } from '@mui/icons-material';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { BACKEND_END_PT } from '../Constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function NestedModal(props) {

    const [friendId, setFriendId ]= React.useState("");

    const friends = [
        { title: 'deepakkushalappa123@gmail.com', year: 1994 },
        { title: 'deepakkushalappa50@gmail.com', year: 1972 },
        { title: 'dca777@gmail.com', year: 1974 },
        { title: 'deepakkushalappa321@gmail.com', year: 2008 }
    ];

    const handleOnChange= ()=>{
        console.log();
    }

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


    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                // onClick={()=>{props.setShowAddFriendDialog(false)}}
            >
                <Box sx={{ ...style, width: 500, height: 210 }}>
                    <h1>Say "Hi" to new Friends!👋🧑‍🧑‍🧒‍🧒</h1>
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                            onChange={(event, value)=>{console.log(value); setFriendId(value)}}
                            id="free-solo-demo"
                            freeSolo
                            options={friends.map((option) => option.title)}
                            renderInput={(params) => <TextField {...params} label="Choose friend or type new friend" />}
                        />
                    </Stack>
                    <br></br>
                    <Button variant='contained' color="success"  style = {{margin: "5px"}} onClick={addFriend}>Add Friend</Button>
                    <Button variant='contained' color="error" onClick={()=>{props.setShowAddFriendDialog(false)}}>Cancel</Button>
                </Box>
            </Modal>
        </div>
    );
}