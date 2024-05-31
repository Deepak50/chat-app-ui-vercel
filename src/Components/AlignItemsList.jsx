import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { Divider, Paper, Stack } from '@mui/material';
import './ALignItemsList.css'


export default function AlignItemsList() {

  const people = [
    {
      name: "Ramesh",
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
      name: "Adarsh",
      lastMsgTime: "30/05/2024"
    },
    {
      name: "Bhavan",
      lastMsgTime: "30/05/2024"
    },
    {
      name: "Koushik",
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
    <Paper sx={{ maxHeight: '100vh', overflow: 'auto', width: '25vw' }} className='example'>
      <List dense style={{ width: '100%', maxWidth: 360, bgcolor: '#e6e6ff' }}>
        {people.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.name}`;
          return (
            <>
              <ListItemButton style={{ height: '60px' }}>
              <Avatar alt="Remy Sharp" src="https://media.geeksforgeeks.org/wp-content/uploads/20210604014825/QNHrwL2q-100x100.jpg" />
                <Stack direction="row" spacing={2} style={{width: '100%'}}>
                 
                  <div style={{ marginLeft: '1vw' }}>{value.name}</div>
                  <div style={{ flexGrow: 1, textAlign: 'right', fontSize: '0.75rem' }}> {value.lastMsgTime} </div>
                </Stack>
                
                
              </ListItemButton>
              <Divider component="li" />
            </>
          );
        })}
      </List>
    </Paper>
  );
}