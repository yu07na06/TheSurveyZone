import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import MainComp from '../components/MainComp';

const MainPage = (match) => {
    return (
        <>
            <Header />
                <MainComp match={match.match} />
            <Footer />
        </>
    );
};

export default MainPage;