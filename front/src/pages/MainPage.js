import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import MainComp from '../components/MainComp';

const MainPage = () => {
    return (
        <>
            <Header />
                <MainComp />
            <Footer />
        </>
    );
};

export default MainPage;