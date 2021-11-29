import { Typography } from '@mui/material';
import React, { useRef } from 'react';
import SurveySubmit from '../UI/SurveySubmit';
import BeforeSurveyComp from '../comp/BeforeSurveyComp'; 
import MainSurveyComp from '../comp/MainSurveyComp';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { getSurvey as getSurveyAPI, getTags as getTagsAPI, modifySurvey as modifySurveyAPI, postSurvey as postSurveyAPI } from '../../../lib/api/survey';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeAction } from '../../../modules/submitReducer';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import MultipleChoiceComp from './MultipleChoiceComp';
import SubjectiveComp from './SubjectiveComp';
import LinearMagnificationComp from './LinearMagnificationComp';

const SurveySubmitComp = ({surveykey, UpdateKey, ReadOnlyState, realReadState}) => {
    const sexAge = useSelector(state=>state.submitReducer.beforeData)
    const surAns_Content = useSelector(state=>state.submitReducer.surAns_Content)
    const [ checkboxlistState, setCheckboxlistState ] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [surveyReqForm, setSurveyReqForm] = useState(null);
    const [day, setDay] = useState([new Date(), new Date()]); // 수정일때 사용
    const [tag, setTag] = useState(null); // 수정일때 사용
    const [tags, setTags] = useState(null); // 수정일때 사용
    const [question, setQuestion] = useState([]); // 질문 덩어리(객관식, 주관식, 선형배율)
    const [anchorEl, setAnchorEl] = useState(null);
    const [check, setCheck] = useState({});
    const [delIndex, setDelIndex] = useState(null);
    const [question_ans, setQuestion_Ans] = useState({}); // 질문에 대한 보기 이름에 대한 배열을 보내기 위해
    const [sex,setSex] = useState();
    const [age,setAge] = useState();
    const submitCheck = useRef(false);
    const open = Boolean(anchorEl);
    const count = useRef(0);
    const theme = createTheme();
    const history = useHistory();
    const dispatch = useDispatch()
    const steps = ['데이터 수집', '설문지', '제출 완료'];

    useEffect(()=>{ // 수정 시, mainSurvey 출력 및 태그 목록 불러오기
        if(UpdateKey){ 
            submitCheck.current = true
            setActiveStep(1); // mainSurveyComp 바로 이동
            getTagsAPI() // 태그 목록 불러오기
                .then((res)=>setTags(res.data))
                .catch(err=>console.log(err));
        }
    },[])

    useEffect(()=>{ // 이거 삭제해도 되는데, 확인 바람
        setCheckboxlistState(surAns_Content)
    },[surAns_Content])

    useEffect(() => { // 설문 조회/수정 시 데이터 들고오는거 알지?
        if(!UpdateKey&&ReadOnlyState){
            setActiveStep(1); // mainSurveyComp 바로 이동
        }
        getSurveyAPI(surveykey)
           .then(res =>{ console.log("요청 결과: ",res.data); setSurveyReqForm(res.data); })
           .catch(err => console.log(err)); // 설문 참여한 사람이라면, 서버쪽에서 알려주어서 튕구는 걸로 함 403
           
   },[surveykey])



   useEffect(()=>{ // 수정/응답시 뿌려주는 용도
       if(surveyReqForm){ // 수정할때도 쓰고~ 응답할때도 쓰는~ 그저 뿌려주는 용도의 useEffect입니다.
           setDay([surveyReqForm.sur_StartDate, surveyReqForm.sur_EndDate]);
           count.current = surveyReqForm.questionList.length;
           let newOrderQuestion = surveyReqForm.questionList.map((value, index)=>{
                switch(value.surQue_QType){
                    case 0: // 주관식
                        return <div key={index}><SubjectiveComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} realReadState={realReadState}/></div>;    
                    case 1: // 객관식
                        return <div key={index}><MultipleChoiceComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} checkboxlistState={checkboxlistState} realReadState={realReadState} /></div>;
                    case 2: // 선형배율
                        return <div key={index}><LinearMagnificationComp ReadOnlyState={true} ReadOnlyData={value} setDelIndex={setDelIndex} number={value.surQue_Order} setCheck={setCheck} UpdateKey={UpdateKey} realReadState={realReadState} /></div>;
                    default: break;
                }
            });
            setQuestion(newOrderQuestion);
       }
   },[surveyReqForm])




    const handleClick = (event) => setAnchorEl(event.currentTarget);
    
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <BeforeSurveyComp setAge={setAge} setSex={setSex}/>;
            case 1:
                return <MainSurveyComp 
                            surveyReqForm={surveyReqForm} 
                            UpdateKey={UpdateKey} 
                            day={day} 
                            setDay={setDay} 
                            tag={tag} 
                            setTag={setTag} 
                            tags={tags} 
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            open={open}
                            handleClose={handleClose}
                            question={question}
                            ReadOnlyState={true}
                        /> ;
            case 2:
                return  <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                설문 감사합니다 :)
                            </Typography>
                        </React.Fragment>;
            default:
                throw new Error('Unknown step');
        }
    }
    
    useEffect(()=>{
        setQuestion_Ans({...question_ans, ...check}); // 객관식, 주관식, 선형 배율의 보기들을 합치는 곳
    },[check]);

    useEffect(()=>{
        // 객,주,선 삭제
        const newQuestionList = question.filter((value)=> value.key!==delIndex );
        setQuestion(newQuestionList);

        // 해당 객관식 보기 삭제
        for (const key in question_ans) {
            if(key == delIndex)
                delete question_ans[key];
        }
    },[delIndex]);


    const handleClose = (e) => {
        setAnchorEl(null); // 메뉴 닫기
        switch(e.target.id){
            case '객관식':
                setQuestion([...question, <div key={count.current}><MultipleChoiceComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false} checkboxlistState={checkboxlistState}/></div>  ]);
                break;
            case '주관식':
                setQuestion([...question, <div key={count.current}><SubjectiveComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
                break;
            case '선형배율':
                setQuestion([...question, <div key={count.current}><LinearMagnificationComp ReadOnlyState={false} ReadOnlyData={null} setDelIndex={setDelIndex} number={count.current} setCheck={setCheck} UpdateKey={false}/></div>  ]);
                break;
            default : break;
        }
        count.current+=1;
    };

    const lastSubmit = (e) => {
        e.preventDefault();
        if (submitCheck.current === false){
            submitCheck.current = true
        }else{
            const data = new FormData(e.currentTarget);
                
            let tempArray = [];
            let temp = '';
            let OrderNumber = 0;
            let tempString = "";
            
            for (const key in surAns_Content) {
                let splitValue=surAns_Content[key].split('_');
                temp = data.get(surAns_Content[key]);
                console.log('temp!!!', temp);
                
                switch(splitValue[0]){
                    case 'SurQueAnswer': // 주관식
                        if(tempString!="" || splitValue[1] != OrderNumber){
                            tempArray.push(tempString);
                            tempString = "";
                            OrderNumber++;
                        }
                        tempArray.push(temp);
                        OrderNumber++;
                        break;

                    case 'SurQueCheck': // 객관식
                        for(let i=0; i<=Number(splitValue[2]); i++){
                            temp = data.get(`SurQueCheck_${splitValue[1]}_${i}`);
                            if(temp != null){
                                if(splitValue[1] != OrderNumber){
                                    tempArray.push(tempString);
                                    tempString="";
                                    OrderNumber++;
                                }
                                tempString += temp + 'Θ';   
                            }
                        }
                        break;
                    case 'radio': // 선형배율
                        if(tempString!="" || splitValue[1] != OrderNumber){
                            tempArray.push(tempString);    
                            tempString = "";
                            OrderNumber++;
                        }
                        if(temp == null){
                            tempArray.push('');
                        }
                        else{
                            let value2 = temp.split('_');
                            tempArray.push(value2[2]);
                            OrderNumber++;
                        }
                        break;
                    default: break;
                }

            }
            // surAns_Content.map((value, index) =>{
            //     let splitValue=value.split('_');
            //     temp = data.get(value);
            //     console.log('temp!!!', temp);
                

            //     switch(splitValue[0]){
            //         case 'SurQueAnswer': // 주관식
            //             if(tempString!="" || splitValue[1] != OrderNumber){
            //                 tempArray.push(tempString);
            //                 tempString = "";
            //                 OrderNumber++;
            //             }
            //             tempArray.push(temp);
            //             OrderNumber++;
            //             break;

            //         case 'SurQueCheck': // 객관식
            //             if(temp != null){
            //                 if(splitValue[1] != OrderNumber){
            //                     tempArray.push(tempString);
            //                     tempString="";
            //                     OrderNumber++;
            //                 }
            //                 tempString += temp + 'Θ';   
            //             }
            //             break;

            //         case 'radio': // 선형배율
            //             if(tempString!="" || splitValue[1] != OrderNumber){
            //                 tempArray.push(tempString);    
            //                 tempString = "";
            //                 OrderNumber++;
            //             }
            //             if(temp == null){
            //                 tempArray.push('');
            //             }
            //             else{
            //                 let value2 = temp.split('_');
            //                 tempArray.push(value2[2]);
            //                 OrderNumber++;
            //             }
            //             break;
            //         default: break;
            //     }
            // })
            if(tempString!='')
                tempArray.push(tempString);

            const answerList = tempArray.map((v)=>{
                return {'surAns_Content':v}
            })
            console.log("정답을 보여줘 : ",answerList );

            if(UpdateKey){ // 수정 버튼 클릭 ----------------------------------------------------------------------------
                const data = new FormData(e.currentTarget);
                const Sur_Title = data.get('Sur_Title'); // 설문 제목
                const Sur_Content = data.get('Sur_Content'); // 설문 본문

                let newQuestionAnsList = [];
                for (const key in question_ans) {
                newQuestionAnsList.push(question_ans[key]);  
                }
                console.log("question_ans", question_ans);
                console.log("newQuestionAnsList", newQuestionAnsList);
                
                let questionList = question.map((value, index)=>{ // 질문 들어가는 배열
                let SurType = null;
                switch(value.props.children.type.name){
                    case 'SubjectiveComp':
                        SurType=0; // 주관식
                        break;
                    case 'MultipleChoiceComp':
                        SurType=1; // 객관식
                        break;
                    case 'LinearMagnificationComp':
                        SurType=2; // 선형배율
                        break;
                    default: break;
                }

                return {
                    surQue_Content: data.get(`SurQue_Content${value.key}`), // 질문 내용
                    surQue_QType: SurType, // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
                    surQue_Essential: data.get(`SurQue_Essential${value.key}`)==='on'?true:false, // true:필수, false:옵션
                    surQue_MaxAns: data.get(`surQue_MaxAns${value.key}`), // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
                    surQue_Order: index, // 질문의 순서
                    answerList : [],
                    selectList: newQuestionAnsList[index].map((v, idx)=>{ // 객관식만 처리한 상태이므로, 주관식과 선형배율 error(수정 부탁)
                    return {
                        surSel_Content: v!='null'?data.get(v):'', // 보기 내용 --> 주관식의 경우, ''빈값으로 보냄
                        surSel_Order: v!='null'?idx:'' // 보기 순서 --> 주관식의 경우, ''빈값으로 보냄
                    };
                    })
                };
                });

                let obj = {
                sur_Type:1, // 오정환 주입! 일단 하라고 하시넹 오키
                sur_Title: Sur_Title, // 설문 제목
                sur_Content: Sur_Content, // 설문 본문
                sur_State: new Date() < day[0]?0:1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
                sur_StartDate: typeof day[0] == 'string' ? day[0] : day[0].getFullYear()+"-"+ ('0'+(day[0].getMonth()+1)).slice(-2) +"-"+('0'+(day[0].getDate())).slice(-2), // Date 객체로 던지세요.     ---> comp에서 state로 관리중
                sur_EndDate: typeof day[1] === 'string' ? day[1] : day[1].getFullYear()+"-"+ ('0'+(day[1].getMonth()+1)).slice(-2) +"-"+('0'+(day[1].getDate())).slice(-2),                               // ---> comp에서 state로 관리중
                sur_Publish: true, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
                sur_Image: "image", // 이미지 추후에 현재는 제외
                // user_Email: "dbsk7885@daum.net",  // 작성자 ID
                sur_Tag: data.get(`sur_Tag`),
                questionList,
                }

                console.log("수정 데이터", obj);

                modifySurveyAPI(surveykey, obj)
                    .then(res=>console.log("수정 성공..?", res))
                    .catch(err=>console.log("수정 실패..?", err));
                wayBackMySurvey();
            }else{ // 질문 응답 버튼 클릭 시 ---------------------------------------------------------------------------------------------------------------------------
                console.log('제출 했니?');
                postSurveyAPI(surveykey,{"age":sexAge.age, "gender":sexAge.sex, "answerList":[...answerList]})
                    .then(res => console.log("제출 성공..?",res))
                    .catch(err => console.log("제출 실패..000?",err));
            }
            
            submitCheck.current = false;
        }
        setActiveStep(activeStep + 1); // 다음 페이지로 이동
    }

    const nextPage = () => dispatch(beforeAction({age:age,sex:sex}));

    const wayBackHome = () =>{
        Swal.fire('Way Back Home ~');
        history.push('/');
    }

    const wayBackMySurvey = () => {
        Swal.fire('내 설문지로 이동');
        history.push('/MySurveyPage');
    }
    return (
        <>
            <SurveySubmit 
                steps={steps}
                getStepContent={getStepContent}
                theme={theme}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                lastSubmit={lastSubmit}
                nextPage={nextPage}
                wayBackHome={wayBackHome}
                UpdateKey={UpdateKey}
                ReadOnlyState={ReadOnlyState}
            />   
        </>
    );
};

export default SurveySubmitComp;