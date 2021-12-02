import React from 'react';
import MainComp from '../components/MainComp';

const MainPage = (match) => {
    return (
        <>
            <MainComp match={match.match} />
        </>
    );
};

export default MainPage;