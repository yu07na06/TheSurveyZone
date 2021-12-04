import { handleActions } from "redux-actions";
import produce from 'immer';
import { createAction } from "redux-actions";
import { takeLatest } from '@redux-saga/core/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import { mainUser as mainUserAPI} from "../lib/api/home";

const [CHARTDATA, CHARTDATA_SUCCESS, CHARTDATA_FAILURE] = createRequestActionTypes("CHARTDATA")

export const chartData = createAction(CHARTDATA);

const chartDataSaga = createRequestSaga(CHARTDATA, mainUserAPI)

export function* mainViewSaga(){
    yield takeLatest(CHARTDATA,chartDataSaga);
}

const initialState = {
    responseAcc : {
        part_Total: 0,
        survey_Total : 23,
        part_Age_Man: 
        {
            age_10: 0,
            age_20: 0,
            age_30: 0,
            age_40: 0,
            age_50: 0,
            age_60: 0
        },
        part_Age_Woman: 
        {
            age_10: 0,
            age_20: 0,
            age_30: 0,
            age_40: 0,
            age_50: 0,
            age_60: 0
        },
        sur_Tag:[]
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
    
}, initialState)

export default chartReducer