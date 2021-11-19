import { handleActions } from "redux-actions";
import produce from 'immer';
import { createAction } from "redux-actions";
import { takeLatest } from '@redux-saga/core/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import { mainUser as mainUserAPI} from "../lib/api/survey";

const [CHARTDATA, CHARTDATA_SUCCESS, CHARTDATA_FAILURE] = createRequestActionTypes("CHARTDATA")

export const chartData = createAction(CHARTDATA);

const chartDataSaga = createRequestSaga(CHARTDATA, mainUserAPI)

export function* mainViewSaga(){
    yield takeLatest(CHARTDATA,chartDataSaga);
}

const initialState = {
    responseAcc : {
        part_Total: 0,
        part_Gender: 
        {
            man: 0,
            woman: 0
        },
        part_Age: 
        {
            age_10: 0,
            age_20: 0,
            age_30: 0,
            age_40: 0,
            age_50: 0,
            age_60: 0
        }
    },
    err: null,
}

const chartReducer = handleActions ({
    [CHARTDATA_SUCCESS]: (state, {payload : data}) =>
    produce(state, draft => {
      draft.responseAcc=data;
    }),

    [CHARTDATA_FAILURE]: (state, { payload: err }) =>({
        ...state,
        err
    }),

    // [CHARTDATA_SUCCESS]: (state, { payload: { form, key, value } }) =>
    // produce(state, draft => {
    //   draft[form][key] = value; // 예: state.register.username을 바꾼다
    // }),
    // [CHARTDATA_FAILURE]:
}, initialState)

export default chartReducer