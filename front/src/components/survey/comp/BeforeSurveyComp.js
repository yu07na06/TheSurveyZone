import React from 'react';
import BeforeSurvey from '../UI/BeforeSurvey';
import { styled } from '@mui/material/styles';

const BeforeSurveyComp = () => {
    const marks = [
        {
          value: 10,
          label: '10대',
        },
        {
          value: 20,
          label: '20대',
        },
        {
          value: 30,
          label: '30대',
        },
        {
          value: 40,
          label: '40대',
        },
        {
          value: 50,
          label: '50대',
        },
        {
          value: 60,
          label: '60대',
        }
      ];
    
    const valuetext = (value) => {
        return `${value}`;
    }
    
    
    const Separator = styled('div')(
      ({ theme }) => `
      height: ${theme.spacing(3)};
      `,
    );

    return (
        <>
            <BeforeSurvey 
                marks={marks}
                valuetext={valuetext}
                Separator={Separator}
            />
        </>
    );
};

export default BeforeSurveyComp;