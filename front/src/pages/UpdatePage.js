import React from 'react';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';


const UpdatePage = (props) => {
    return (
        <>
            <SurveySubmitComp surveykey={props.match.params.surveykey} UpdateKey={true} />
        </>
    );
};

export default UpdatePage;