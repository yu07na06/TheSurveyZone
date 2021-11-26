import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button, Grid, Pagination, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import ClipboardCopy from '../../common/Function';

const MySurvey = ({mySurList,callPaging, ApiClick}) => {
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
                                    {value.sur_State===0?<Button id="mod" onClick={(e)=>ApiClick(e,value._id)}>수정</Button>:<Button id="result" onClick={(e)=>ApiClick(e,value._id)}>결과</Button>}
                                    <Button id="del" onClick={(e)=>ApiClick(e,value._id)}>삭제</Button>
                                    {ClipboardCopy("icon",`http://115.22.11.110:3000/SurveySubmitPage/${value._id}`)}
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