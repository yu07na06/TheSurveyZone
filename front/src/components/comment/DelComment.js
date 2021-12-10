import React, { useState } from 'react';
import { commentDelete as commentDeleteAPI, commentSelect as commentSelectAPI } from '../../lib/api/survey';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DelComment = ({ _id, data, style, setCommentList }) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const delCom = (e) => {
        e.preventDefault();
        // console.log(e.target.com_Password.value);
        
        // api 요청할 데이터 form 
        const com_Password = document.querySelector('#com_Password');

        const delCommentObj = {com_ID: data.com_ID,
                               com_Password: e.target.com_Password.value};

        console.log('delCommentObj', delCommentObj);
        commentDeleteAPI(_id, delCommentObj)
            .then(()=> commentSelectAPI(_id)
                        .then(res=>{setCommentList(res.data)})
                        .catch(err=>console.log("실패 : ",err)))
            .catch(err=> console.log("삭제 실패 : ",err ));
        com_Password.value = '';
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <CloseIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
            <Box component="form" onSubmit={e=>delCom(e)} sx={style}>
                <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                <Button onClick={handleClose}>닫기</Button>
                <Button type="submit">삭제</Button>
            </Box>

            </Modal>
        </>
    );
}

export default DelComment;



// import React, { useState } from 'react';
// import { commentDelete as commentDeleteAPI, commentSelect as commentSelectAPI } from  '../../lib/api/survey';
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import { Box } from '@mui/system';
// import { Button, TextField } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const DelComment = ({ _id, data, style, setCommentList}) => {
//     const [ anchorEl, setAnchorEl ] = useState(null);
//     const open = Boolean(anchorEl);

//     const handleClick = (e) => setAnchorEl(e.currentTarget);
//     const handleClose = () => setAnchorEl(null);
//     const delCom = (e) => {
//         e.preventDefault();
        
//         const com_Password = document.querySelector('#com_Password');
//         // api 요청할 데이터 form 
//         const delCommentObj = {com_ID: data.com_ID,
//                                com_Password: e.target.com_Password.value};
//         console.log('delCommentObj', delCommentObj);
        
//         commentDeleteAPI(_id, delCommentObj)
//         .then(()=> commentSelectAPI(_id)
//                     .then(res=>{setCommentList(res.data)})
//                     .catch(err=>console.log("실패 : ",err)))
//         .catch(err=> console.log("삭제 실패 : ",err ));
//         com_Password.value = '';
//         handleClose();
//     }

//     return(
//         <>
//             <IconButton onClick={handleClick} size="small">
//                 <CloseIcon />
//             </IconButton>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
            
//             <Box component="form" onSubmit={e=>delCom(e)} sx={style}>
//                 <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
//                 <Button onClick={handleClose}>닫기</Button>
//                 <Button type="submit">삭제</Button>
//             </Box>

//             </Modal>
//         </>
//     );
// }

// export default DelComment;