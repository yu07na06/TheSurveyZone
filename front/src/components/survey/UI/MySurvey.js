import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CreateIcon from '@mui/icons-material/Create';
import { Grid, Pagination, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const handleCopyClipBoard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert('URL 복사 성공');
    } catch (error) {
        alert('복사 실패..');
    }
};

const MySurvey = ({mySurList,callPaging}) => {
        return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <List>
                    {mySurList&&mySurList.surveylist.map((value) =>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            {/* <ListItemText
                                primary={value.sur_Title}
                            /> */}
                            <ListItemText>
                                <Link to={`/SurveySubmitPage/${value._id}`} style={{textDecoration:'none', color:'gray'}}><Tab label={value.sur_Title} style={{fontWeight:'bold'}}/></Link> 
                            </ListItemText>
                            <CreateIcon color="action" />
                            <InsertChartIcon color="action"/>
                            <DeleteIcon color="action" />
                            <ContentCopyIcon color="action" onClick={()=>handleCopyClipBoard(`http://localhost:3000/SurveySubmitPage/${value._id}`)}/>
                        </ListItem>
                    )}
                    </List>
                    <Grid item marginLeft="33%" xs={12}>
                      {mySurList&&<Pagination onChange={(e)=>callPaging((e.target.ariaLabel).split(' ')[3])} count={mySurList.paginationInfo.lastPage} color="primary" />}
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default MySurvey;



// import React, { useEffect, useState } from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// import Container from '@mui/material/Container';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import CreateIcon from '@mui/icons-material/Create';
// import { Grid, Pagination } from '@mui/material';

// const handleCopyClipBoard = async (text) => {
//     try {
//         await navigator.clipboard.writeText(text);
//         alert('URL 복사 성공');
//     } catch (error) {
//         alert('복사 실패..');
//     }
// };

// const MySurvey = ({mySurList,callPaging}) => {
//     console.log("잘~~ set되었나??",mySurList);
    
//         return (
//         <>
//             <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
//                 <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                     <List>
//                     {mySurList&&mySurList.surveylist.map((value) =>
//                         <ListItem>
//                             <ListItemAvatar>
//                                 <Avatar>
//                                     <FolderIcon />
//                                 </Avatar>
//                             </ListItemAvatar>
//                             <ListItemText
//                                 primary={value.sur_Title}
//                             />
//                             <CreateIcon color="action" />
//                             <InsertChartIcon color="action"/>
//                             <DeleteIcon color="action" />
//                             <ContentCopyIcon color="action" onClick={()=>handleCopyClipBoard(`http://localhost:3000/SurveySubmitPage/${value._id}`)}/>
//                         </ListItem>
//                     )}
//                     </List>
//                     <Grid item marginLeft="33%" xs={12}>
//                       {mySurList&&<Pagination onChange={(e)=>callPaging((e.target.ariaLabel).split(' ')[3])} count={mySurList.paginationInfo.lastPage} color="primary" />}
//                     </Grid>
//                 </Paper>
//             </Container>
//         </>
//     );
// };

// export default MySurvey;
