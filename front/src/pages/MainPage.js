import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
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