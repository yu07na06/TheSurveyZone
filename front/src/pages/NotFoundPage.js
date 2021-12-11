import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorSweet from '../components/common/modules/ErrorSweet';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';

const NotFoundPage = () => {
    const history = useHistory();

    setTimeout(()=>{
        history.push('/');    
    },2000)

    ErrorSweet('info', null, '잘못된 접근', '메인 페이지로 이동합니다.', null);
    
    return (
        <>
            <Header />
                <img src='https://ifh.cc/g/ZZVSjK.png'  height="1200" width="100%" border='0' alt="404 not found"/>
            <Footer />
        </>
    );
}

export default NotFoundPage;