import axios from 'axios';

// 설문 생성
export const createSurvey = (questionList) =>
    axios.post("/api/v1/survey/", questionList);

// 설문 조회
export const getSurvey = (sur_ID) => 
    axios.get(`/api/v1/survey/${sur_ID}`);

// 설문 제출
export const postSurvey = (sur_ID) => 
    axios.post(`/api/v1/survey/${sur_ID}`);
