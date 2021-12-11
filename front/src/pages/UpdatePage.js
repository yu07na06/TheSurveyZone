import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';


const UpdatePage = (props) => {
    return (
        <>
            <Header />
                <SurveySubmitComp surveykey={props.match.params.surveykey} UpdateKey={true} />
            <Footer />
        </>
    );
};

export default UpdatePage;