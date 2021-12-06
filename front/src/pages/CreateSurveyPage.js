import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import CreateSurveyComp from '../components/survey/comp/CreateSurveyComp';

const CreateSurveyPage = () => {
    return (
        <>
            <Header />
                <CreateSurveyComp />
            <Footer />
        </>
    );
};

export default CreateSurveyPage;