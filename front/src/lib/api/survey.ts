import axios from "axios";
import { objType } from "src/components/common/TypeFunction";

export const createSurvey = (questionList: objType) =>
  axios.post(`/api/v1/survey/`, questionList);

export const getSurvey = (sur_ID) => 
  axios.get(`/api/v1/survey/${sur_ID}`);

export const postSurvey = (sur_ID, answerList) =>
  axios.post(`/api/v1/survey/${sur_ID}`, answerList);

export const getTags = () => 
  axios.get(`/api/v1/survey/tags`);

export const getMySurveyList = (page_Num: number) =>
  axios.get(`/api/v1/survey/myPage?page_Num=${page_Num}`);

export const getImgURL = (formData) =>
  axios.post(`/api/v1/image`, formData);

export const deleteSurvey = (sur_ID) =>
  axios.delete(`/api/v1/survey/${sur_ID}`);

export const modifySurvey = (sur_ID, surveyInsertDTO) =>
  axios.put(`/api/v1/survey/${sur_ID}`, surveyInsertDTO);

export const resultSurvey = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/result`);

export const surveyCheck = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/Check`);
  
export const surveyModifyCheck = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/ModifyCheck`);

export const surveySend = (_id, emailList) =>
  axios.post(`/api/v1/user/send`, { _id, emailList });

export function commentInsert (_id,commentObj){
  return axios.post(`/api/v1/survey/${_id}/comment`,commentObj )
}

export function commentSelect (_id,page_Num){
  return axios.get(`/api/v1/survey/${_id}/comment/?page_Num=${page_Num}`)
}

export function commentModify (_id, modiCommentObj){
  return axios.put(`/api/v1/survey/${_id}/comment`, modiCommentObj)
}

export function commentDelete (_id, delCommentObj){
  return axios.delete(`/api/v1/survey/${_id}/comment`, { data: delCommentObj })
}