import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import RegisterComp from '../components/register/comp/RegisterComp';

const ResultPage = () => {
    return (
        <>
            <Header />
                <RegisterComp />
            <Footer />
        </>
    );
};

export default ResultPage;