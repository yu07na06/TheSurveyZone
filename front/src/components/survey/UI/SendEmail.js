import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import { surveySend as surveySendAPI } from '../../../lib/api/survey';
import ErrorSweet from '../../common/modules/ErrorSweet';
import EList from './EList';

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
    handleClose();
    surveySendAPI(_id, emailList)
      .then(res => ErrorSweet('info', null, '메일 전송 완료', '메일을 성공적으로 전송을 완료했습니다.', null ))
      .catch(err => ErrorSweet('error', null, '메일 전송 실패', '메일 전송에 실패했습니다.', null ));
    setEmailList([])
  }

  const add = (e) => {
    e.preventDefault();
    if (email === "" || email === null ) return;
    setEmailList([...emailList, email])
    setEmail("")
  }

  const checkEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <>
      <Tooltip title="이메일 전송">
        <IconButton onClick={handleClick} size="small" sx={{}}>
          <ForwardToInboxIcon />
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