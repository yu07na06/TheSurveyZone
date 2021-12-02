import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import ChangePWComp from '../components/find/comp/ChangePWComp';

const ChangePWPage = () => {
    return (
        <>
            <Header />
                <ChangePWComp />
            <Footer />
        </>
    );
};

export default ChangePWPage;