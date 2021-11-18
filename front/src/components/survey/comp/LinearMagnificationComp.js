import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import LinearMagnification from '../UI/LinearMagnification';

const LinearMagnificationComp = ({number, setCheck}) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);
    const [temp, setTemp] = useState('');
    let value = [1,2,3,4,5,6,7,8,9];
    const valuetext = (value) => {
        return `${value}`;
    }
    const [selectedValue, setSelectedValue] = React.useState("a");
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item }
    });

    useEffect(()=>{
        setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
    },[minValue, maxValue, temp])
    
    return (
        <>
            <LinearMagnification 
                number={number}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                value={value}
                valuetext={valuetext}
                controlProps={controlProps}
                setTemp={setTemp}
            />
        </>
    );
};

export default LinearMagnificationComp;