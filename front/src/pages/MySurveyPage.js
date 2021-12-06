import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import MySurveyComp from '../components/survey/comp/MySurveyComp';

const MySurveyPage = () => {
    return (
        <>
            <Header />
                <MySurveyComp />
            <Footer />
        </>
    );
};

export default MySurveyPage;