import React, { useState } from 'react';
import CreateSurvey from '../UI/CreateSurvey';
import { createTheme } from '@mui/material/styles';

const CreateSurveyComp = () => {
  const theme = createTheme();
  const onClick = () => {
    // form 제출
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

    return (
        <>
          <CreateSurvey 
            theme={theme}
            onClick={onClick}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}

          />  
        </>
    );
};

export default CreateSurveyComp;