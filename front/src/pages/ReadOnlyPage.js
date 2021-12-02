import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';

const ReadOnlyPage = (props) => {
    return (
        <>
            <Header />
                <SurveySubmitComp surveykey={props.match.params.surveykey} ReadOnlyState={true} UpdateKey={false} realReadState={true} />
            <Footer />
        </>
    );
};

export default ReadOnlyPage;