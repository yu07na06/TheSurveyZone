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

// 설문 생성시 태그 목록 불러오기
export const getTags = () => 
    axios.get('/api/v1/survey/tags');

// 설문 생성시 태그 목록 불러오기  
// 추후 쿠키 및 토큰을 사용하게 되면 email보내는짓은 안함
export const getMySurveyList = (page_Num) => 
    axios.get(`/api/v1/survey/myPage?page_Num=${page_Num}`);

