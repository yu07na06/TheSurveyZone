import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
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