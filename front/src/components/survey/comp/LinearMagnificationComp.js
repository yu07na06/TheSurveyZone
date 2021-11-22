import React, { useState, useEffect, useRef } from 'react';
import LinearMagnification from '../UI/LinearMagnification';
import Radio from "@mui/material/Radio";


const LinearMagnificationComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(null);
    const [temp, setTemp] = useState('');
    const [makeCircles, setMakeCircles] = useState([]);

    let value = [1,2,3,4,5,6,7,8,9];
    const valuetext = (value) => {
        return `${value}`;
    }

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    useEffect(()=>{
        !ReadOnlyState&&setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
    },[minValue, maxValue, temp])

    const [ changeCircle, setChangeCircle ] = useState(null);

    const circle = (id, number, size) => {
        return(
            <Radio
                onChange={(e)=>setChangeCircle(e.target.value)}
                value={`radio_${id}_${number}`}
                name={`radio_${number}`}
                checked={ changeCircle === `radio_${id}_${number}` }
                sx={{
                    "& .MuiSvgIcon-root": {
                        fontSize: size
                    }
                }}
            />
        );
    }

    useEffect(()=>{
        if(ReadOnlyState){
            let newCircle = [];
            let num =  Number(ReadOnlyData.selectList[3].surSel_Content)-Number(ReadOnlyData.selectList[1].surSel_Content);
            for(let i=0; i<=num; i++){
                newCircle.push(circle(i, number, i+20));
            }
            setMakeCircles([...newCircle])
        }
    },[changeCircle])
    
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
                setTemp={setTemp}
                deleteQue={deleteQue}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                makeCircles={makeCircles}

            />
        </>
    );
};

export default LinearMagnificationComp;









// import React, { useState, useEffect, useRef } from 'react';
// import LinearMagnification from '../UI/LinearMagnification';
// // import Radio from "@mui/material/Radio";
// import Circle from '../Circle';

// const LinearMagnificationComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {
//     const [minValue, setMinValue] = useState(0);
//     const [maxValue, setMaxValue] = useState(null);
//     const [temp, setTemp] = useState('');
//     const [makeCircles, setMakeCircles] = useState([]);
//     // const [idxx, setIdxx] = useState(null);
//     let value = [1,2,3,4,5,6,7,8,9];
//     const valuetext = (value) => {
//         return `${value}`;
//     }

//     const deleteQue = (e) => {
//         setDelIndex(e.target.id);
//     }

//     // const B =useRef("a");

//     useEffect(()=>{
//         !ReadOnlyState&&setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
//     },[minValue, maxValue, temp])


//     // const onA = (e, id) =>{
//     //     console.log("num", id);
//     //     setIdxx(id);
//     // }

//     // useEffect(()=>{
//     //     if(idxx!=null){
//     //         returnTrue(idxx);
//     //         setMakeCircles([...makeCircles]);
//     //     }
//     // },[idxx])

//     // const returnTrue = (idxx) => {
//     //     if(idxx!=null){
//     //         return true;
//     //     }else{
//     //         return false;
//     //     }
//     // }

//     // const circle = (id, number, size) => {
//     //             return(
//     //                     <Radio
//     //                         onChange={(e)=>onA(e,id)}
//     //                         value={`radio_${id}_${number}`}
//     //                         name={`radio_${number}`}
//     //                         checked={returnTrue()}
//     //                         sx={{
//     //                         "& .MuiSvgIcon-root": {
//     //                             fontSize: size
//     //                         }
//     //                         }}
//     //                     />
//     //             );
//     //         }
//     const [check111, setCheck111] = useState(false);
//     useEffect(()=>{
//         if(ReadOnlyState){
//             let newCircle = [];
//             let num =  Number(ReadOnlyData.selectList[3].surSel_Content)-Number(ReadOnlyData.selectList[1].surSel_Content);
//             for(let i=0; i<=num; i++){
//                 newCircle.push(<Circle i={i} number={number} size={i+20} check111={check111} setCheck111={setCheck111}/>);
//             }
//             setMakeCircles([...newCircle])
//         }
//     },[])

//     useEffect(()=>{
//         if(check111!=false){
//             setMakeCircles([...makeCircles]);
//         }
//     }, [check111])
    
//     return (
//         <>
//             <LinearMagnification 
//                 number={number}
//                 minValue={minValue}
//                 setMinValue={setMinValue}
//                 maxValue={maxValue}
//                 setMaxValue={setMaxValue}
//                 value={value}
//                 valuetext={valuetext}
//                 // controlProps={controlProps}
//                 setTemp={setTemp}
//                 deleteQue={deleteQue}
//                 ReadOnlyState={ReadOnlyState}
//                 ReadOnlyData={ReadOnlyData}
//                 makeCircles={makeCircles}

//             />
//         </>
//     );
// };

// export default LinearMagnificationComp;

//===============================================================================================================================================================

// import React, { useState, useEffect, useRef } from 'react';
// import LinearMagnification from '../UI/LinearMagnification';
// import Radio from "@mui/material/Radio";

// const LinearMagnificationComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {
//     const [minValue, setMinValue] = useState(0);
//     const [maxValue, setMaxValue] = useState(null);
//     const [temp, setTemp] = useState('');
//     const [makeCircles, setMakeCircles] = useState([]);
//     let value = [1,2,3,4,5,6,7,8,9];
//     const valuetext = (value) => {
//         return `${value}`;
//     }
//    const [selectedValue, setSelectedValue] = useState("b");
//     // const handleChange = (e, idx) => {
//     //   setSelectedValue([...selectedValue, {[idx]:e.target.value}]);
//     // };
//     // const controlProps = (item, idx) => ({
//     //     checked: selectedValue[idx] === item,
//     //     onChange: e=>handleChange(e, idx),
//     //     id:item,
//     //     value: item,
//     //     name: "size-radio-button-demo",
//     //     inputProps: { "aria-label": item }
//     // });
//     const [b,setB] = useState(false);
//     const deleteQue = (e) => {
//         setDelIndex(e.target.id);
//     }

//     const B =useRef("a");
    

//     useEffect(()=>{
//         !ReadOnlyState&&setCheck({[number]:[ `start_Step${number}`, `start_Name${number}_${minValue}`, `end_Step${number}`, `end_Name${number}_${maxValue}`]});
//     },[minValue, maxValue, temp])

//     const onA = (e) => {
//         setSelectedValue(e.target.value);
//         // console.log();
//         B.current=selectedValue;
//     }

//     useEffect(()=>{

//         // console.log("selectedValue의 값 : ", selectedValue);    
//         if(B.current!=="a"){
//         B.current=selectedValue;
//         }
//         // console.log("B.current의 값 :", B.current);
//         console.log("둘이 값이 같냐??? 엉????",B.current === selectedValue);
//         setB(B.current === selectedValue);
//         // console.log("이걸로 확인해야지!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, ", makeCircles);
//         // setMakeCircles([...makeCircles]);
//         // console.log("이걸로 확인해야지!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, ", makeCircles);
//     },[selectedValue])
//     // const onA = (e) => {
//     //     // console.log("ID 값 :", e.target.id );
//     //     // console.log("value값 :", e.target.value );
//     //     console.log("name값 :", e.target.name );
//     //     // e.checked = true;
        
//     // }

//     useEffect(()=>{
//         console.log("state b의 값 : ", b);
//     })


//     const circle = (id, number, size) => {
//         return(
//                 <Radio
//                     onChange={(e)=>onA(e)}
//                     value={`radio_${id}_${number}`}
//                     // checked={B.current === selectedValue}
//                     checked={b}
//                     name={`radio_${number}`}
//                     sx={{
//                     "& .MuiSvgIcon-root": {
//                         fontSize: size
//                     }
//                     }}
//                 />
//         );
//     }

//     // useEffect(()=>{
//     //     setMakeCircles([...makeCircles]);
//     // },[selectedValue])

//     useEffect(()=>{
//         if(ReadOnlyState){
//             let newCircle = [];
//             // console.log("ReadOnlyData Lin", ReadOnlyData.selectList[3].surSel_Content);
//             let num =  Number(ReadOnlyData.selectList[3].surSel_Content)-Number(ReadOnlyData.selectList[1].surSel_Content);
//             // console.log("num", num);
//             for(let i=0; i<=num; i++){
//                 newCircle.push(circle(i, number, i+20));
//             }
//             // newCircle = ReadOnlyData.selectList.map((value, index)=>{
//             //     return circle(index+5)
//             // })
//             // console.log("newCircle", newCircle);
//             setMakeCircles([...newCircle])
//         }
//     },[])
    
//     return (
//         <>
//             <LinearMagnification 
//                 number={number}
//                 minValue={minValue}
//                 setMinValue={setMinValue}
//                 maxValue={maxValue}
//                 setMaxValue={setMaxValue}
//                 value={value}
//                 valuetext={valuetext}
//                 // controlProps={controlProps}
//                 setTemp={setTemp}
//                 deleteQue={deleteQue}
//                 ReadOnlyState={ReadOnlyState}
//                 ReadOnlyData={ReadOnlyData}
//                 makeCircles={makeCircles}

//             />
//         </>
//     );
// };

// export default LinearMagnificationComp;