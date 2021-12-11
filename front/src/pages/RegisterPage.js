import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import RegisterComp from '../components/register/comp/RegisterComp';

const RegisterPage = () => {
    return (
        <>
            <Header />
                <RegisterComp />
            <Footer />
        </>
    );
};

export default RegisterPage;