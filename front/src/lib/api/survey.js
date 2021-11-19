import axios from 'axios';

export const createSurvey = (questionList) =>
    axios.post("/api/v1/survey/", questionList);

export const getSurvey = (sur_ID) => 
    axios.get(`/api/v1/survey/${sur_ID}`);

export const mainUser = () => 
    axios.get('/api/v1/main/acc');