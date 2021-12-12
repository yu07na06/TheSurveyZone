import { createAction, handleActions } from "redux-actions";

const [LOGINSTATE, USEREMAIL] = ['LOGINSTATE', 'USEREMAIL'];

export const LoginStateAction = createAction(LOGINSTATE, loginState => loginState);
export const UserEmailAction = createAction(USEREMAIL, User_Email => User_Email);

const initialState = {
    loginState:false,
    User_Email:'',
};

const loginReducer = handleActions({
    [LOGINSTATE]:(state, { payload: loginState }) =>({
        ...state,
        loginState
    }),

    [USEREMAIL]:(state, { payload: User_Email })=>({
        ...state,
        User_Email
    })

}, initialState);

export default loginReducer;