import { Button, TextField } from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import EList from './EList';
import { surveySend as surveySendAPI } from '../../../lib/api/survey';
const SendEmail = ({ _id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [email, setEmail] = useState(null);
  const [emailList, setEmailList] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const send = (e) => {
    console.log(e);
    handleClose();
    // 여기서 list 요청해야함!
    surveySendAPI(_id, emailList)
      .then(res => console.log("성공", res))
      .catch(err => console.log("실패", err));
    setEmailList([])
  }

  const add = (e) => {
    e.preventDefault();
    if (email === "") return;
    if (email === null) return;
    setEmailList([...emailList, email])
    setEmail("")
  }

  const checkEmail = (e) => {
    setEmail(e.target.value)
  }


  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{}}>
          <ForwardToInboxIcon onClick={(e) => console.log("나를 눌렀는가?")} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <Box component="form" onSubmit={(e) => add(e)} >
          <MenuItem>
            <TextField onChange={(e) => checkEmail(e)} type="email" label="E-maile" id="email" name="email" value={email} />
            <Button type="submit" name="add" id="add" key="add"> + </Button>
            <Button onClick={(e) => send(e)} tname="send" id="send"> 전송 </Button>
            <Button onClick={handleClose}>닫기</Button>
          </MenuItem>
        </Box>
        <EList emailList={emailList} setEmailList={setEmailList} />
      </Menu>
    </>
  );
}
export default SendEmail;