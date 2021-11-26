import { createTheme } from '@mui/material/styles';
import React from 'react';
import MainSurvey from '../UI/MainSurvey';

const MainSurveyComp = ({ surveyReqForm, UpdateKey, day, setDay, tag, setTag, tags, handleClick, anchorEl, open, handleClose, question, ReadOnlyState}) => {
    const theme = createTheme();
    return (
        <>
            <MainSurvey 
                theme={theme}
                surveyReqForm={surveyReqForm}
                UpdateKey={UpdateKey}
                day={day}
                setDay={setDay}
                tag={tag}
                setTag={setTag}
                tags={tags}
                handleClick={handleClick}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                question={question}
                ReadOnlyState={ReadOnlyState}
            />
        </>
    );
};

export default MainSurveyComp;