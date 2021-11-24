import React from 'react';
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

const MySurvey = ({mySurList,callPaging, handleCopyClipBoard}) => {
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