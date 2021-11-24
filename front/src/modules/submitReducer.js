import { createAction, handleActions } from "redux-actions";

const SUBMIT = "SUBMIT";
const BEFORESUBMIT = "BEFORESUBMIT";

export const submitAction = createAction(SUBMIT);
export const beforeAction = createAction(BEFORESUBMIT);

const initialState = {
    surAns_Content:[],
    beforeData:{
        age:"",
        sex:""
    }
        
};

// 설문 응답시에 제출할때의 data를 만들기 위한 reducer입니다.
const submitReducer = handleActions({
    // main설문 응답 data를 surAns_Content배열에 차곡차곡 쌓기 위함
    [SUBMIT]:(state, { payload: data}) =>{
        return ({
        ...state,
        surAns_Content: state.surAns_Content.concat(data)
    })},

    // main설문 응답 전 연령대 및 성별데이터를 받는 용도
    [BEFORESUBMIT]:(state, { payload: {age,sex}}) =>({
        ...state,
        beforeData: {age, sex}
    }),

}, initialState);

export default submitReducer;