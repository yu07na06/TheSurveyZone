import axios from 'axios';

export const createsurvey = ({questionList}) =>
    axios.post("/api/v1/survey/", {questionList});