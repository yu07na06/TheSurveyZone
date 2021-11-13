import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';

const SurveySubmitPage = () => {
    return (
        <>
            <Header />
                <SurveySubmitComp />
            <Footer />
        </>
    );
};

export default SurveySubmitPage;