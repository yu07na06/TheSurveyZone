import React, { useState } from 'react';
import Bpp from '../Bpp';

const Yuna = () => {
    const name = 300;
    const age = 200;
    const [count,setCounter] = useState(0);
    return (
        <div>
            {count}
            <Bpp name={name} age={age} setCounter={setCounter} count={count}/>
        </div>
    );
};

export default Yuna;