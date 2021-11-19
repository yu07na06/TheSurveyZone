import axios from 'axios';

export const createSurvey = (questionList) =>
    axios.post("/api/v1/survey/", questionList);

export const getSurvey = (sur_ID) => 
    axios.get(`/api/v1/survey/${sur_ID}`)