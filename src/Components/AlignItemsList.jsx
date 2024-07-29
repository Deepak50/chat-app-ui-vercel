import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { Divider, Paper, Stack } from '@mui/material';
import './ALignItemsList.css'
import { BACKEND_END_PT } from '../Constants';
import { useEffect, useState } from 'react';
import { printDate } from '../Utils/Utils';
import TestSocket from './TestSocket';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllChat, updateSelectedUserName, updateCurrentChat } from '../Redux/Chat';

export default function AlignItemsList() {
  const { friends } = useSelector((state) => state.friends);
  const { currentChat } = useSelector((state) => state.chat);
  const { allChat } = useSelector((state) => state.chat);
  const { selectedUserName } = useSelector((state) => state.chat);
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const dispatch = useDispatch();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };



  useEffect(() => {
    dispatch(updateCurrentChat(allChat[selectedUserName]));
  }, [selectedUserName]);

  return (
      <List dense style={{ minWidth:'25vw', maxWidth: 360, bgcolor: '#e6e6ff' }}>
        {
          friends.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${value.userId}`;
            let d = null;
            if (value.sentDate != null) {
              d = new Date(value.sentDate);
            }

            return (
              <>
                <ListItemButton selected={index === selectedIndex}
                  onClick={() => {setSelectedIndex(index); dispatch(updateSelectedUserName(value.userId));}} sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#e0e0eb"
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "yellow"
                    }
                    
                  }}   >
                  <Avatar alt="Remy Sharp" src={value.profilePic} />
                  <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                    <div style={{ marginLeft: '1vw' }}>{value.userName}</div>
                    <div style={{ flexGrow: 1, textAlign: 'right', fontSize: '0.75rem' }}> {printDate(d)} </div>
                  </Stack>
                </ListItemButton>
                <Divider component="li" />
              </>
            );
          })}
      </List>
  );
}