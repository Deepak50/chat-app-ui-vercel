import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { Divider, Paper, Stack } from '@mui/material';
import './ALignItemsList.css'
import { BACKEND_END_PT } from '../Constants';
import { useEffect, useState } from 'react';
import { connect, printDate } from '../Utils/Utils';
import TestSocket from './TestSocket';

export default function AlignItemsList() {

  const [people, setPeople] = useState([{
    name: "Ramesh",
    lastMsgTime: "30/05/2024"
  }]);


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(BACKEND_END_PT + "/getFriends", requestOptions)
      .then((response) => response.json())
      .then((result) => { setPeople(result.data) })
      .catch((error) => console.error(error));
  }, []);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('bearer'));
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  return (
    <Paper sx={{ maxHeight: '100vh', overflow: 'auto', width: '25vw' }} className='example'>
      <List dense style={{ width: '100%', maxWidth: 360, bgcolor: '#e6e6ff' }}>
        {
          people.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.name}`;
            let d = null;
            if(value.sentDate != null){
              d = new Date(value.sentDate);
            }
            return (
              <>
                <ListItemButton style={{ height: '60px' }} onClick={()=>connect(value.userId)}>
                  <Avatar alt="Remy Sharp" src="https://media.geeksforgeeks.org/wp-content/uploads/20210604014825/QNHrwL2q-100x100.jpg" />
                  <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                    <div style={{ marginLeft: '1vw' }}>{value.userName}</div>
                    <div style={{ flexGrow: 1, textAlign: 'right', fontSize: '0.75rem' }}> { printDate(d) } </div>
                  </Stack>
                </ListItemButton>
                <Divider component="li" />
              </>
            );
          })}
      </List>
    </Paper>
    // <TestSocket></TestSocket>  
  );
}