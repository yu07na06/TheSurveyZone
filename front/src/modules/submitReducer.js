import { createAction, handleActions } from "redux-actions";

const [SUBMIT, BEFORESUBMIT] = ["SUBMIT", "BEFORESUBMIT"];

export const submitAction = createAction(SUBMIT);
export const beforeAction = createAction(BEFORESUBMIT);

const initialState = {
    surAns_Content:{},
    beforeData:{
        age:20,
        sex:"M"
    }
};

const submitReducer = handleActions({
    [SUBMIT]:(state, { payload: data}) =>{
        return ({
        ...state,
        surAns_Content: {...state.surAns_Content, ...data}
    })},

    [BEFORESUBMIT]:(state, { payload: {age,sex}}) =>({
        ...state,
        beforeData: {age, sex}
    }),

}, initialState);

export default submitReducer;