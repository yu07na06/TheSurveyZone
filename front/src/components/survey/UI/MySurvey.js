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
// import { styled } from 'style'

function generate(element) {
    return [0, 1, 2, 3, 4, 5].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}

const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

const MySurvey = () => {
    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <List>
                    {generate(
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Single-line item"
                            />
                            <input id='myInput' value='야호' type='hidden'/>
                            <CreateIcon color="action" />
                            <InsertChartIcon color="action"/>
                            <DeleteIcon color="action" />
                            <ContentCopyIcon color="action" onClick={()=>handleCopyClipBoard('고마워')}/>
                        </ListItem>
                    )}
                    </List>
                </Paper>
            </Container>
        </>
    );
};

export default MySurvey;