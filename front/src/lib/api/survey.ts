import axios from "axios";
import { objType } from "src/components/common/TypeFunction";

// 설문 생성
export const createSurvey = (questionList: objType) =>
  axios.post(`/api/v1/survey/`, questionList);

// 설문 조회 || 설문 참여자들이 보여지는 설문
export const getSurvey = (sur_ID) => 
  axios.get(`/api/v1/survey/${sur_ID}`);

// 설문 제출
export const postSurvey = (sur_ID, answerList) =>
  axios.post(`/api/v1/survey/${sur_ID}`, answerList);

// 설문 생성시 태그 목록 불러오기
export const getTags = () => 
  axios.get(`/api/v1/survey/tags`);

// 설문 생성시 태그 목록 불러오기
// 추후 쿠키 및 토큰을 사용하게 되면 email보내는짓은 안함
export const getMySurveyList = (page_Num: number) =>
  axios.get(`/api/v1/survey/myPage?page_Num=${page_Num}`);

// S3에서 이미지 URL 들고오기
export const getImgURL = (formData) =>
  axios.post(`/api/v1/image`, formData);

// 설문 삭제
export const deleteSurvey = (sur_ID) =>
  axios.delete(`/api/v1/survey/${sur_ID}`);

// 설문 수정
export const modifySurvey = (sur_ID, surveyInsertDTO) =>
  axios.put(`/api/v1/survey/${sur_ID}`, surveyInsertDTO);

// 결과 조회
export const resultSurvey = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/result`);

// 설문 참여 체크
export const surveyCheck = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/Check`);
  
// 설문 수정 권한 체크
export const surveyModifyCheck = (sur_ID) =>
  axios.get(`/api/v1/survey/${sur_ID}/ModifyCheck`);

// 설문 메일 전송
export const surveySend = (_id, emailList) =>
  axios.post(`/api/v1/user/send`, { _id, emailList });

//========================================================================================
// 설문 댓글 삽입
export function commentInsert (_id,commentObj){
  return axios.post(`/api/v1/survey/${_id}/comment`,commentObj )
}

// 설문 댓글 조회
export function commentSelect (_id,page_Num){
  return axios.get(`/api/v1/survey/${_id}/comment/?page_Num=${page_Num}`)
}

// 설문 댓글 수정
export function commentModify (_id, modiCommentObj){
  return axios.put(`/api/v1/survey/${_id}/comment`, modiCommentObj)
}

// 설문 댓글 삭제
export function commentDelete (_id, delCommentObj){
  return axios.delete(`/api/v1/survey/${_id}/comment`, { data: delCommentObj })
}

// import axios from "axios";
// import { objType } from "src/components/common/TypeFunction";

// // 설문 생성
// export const createSurvey = (questionList: objType) =>
//   axios.post(`${process.env.APIURL}/api/v1/survey/`, questionList);

// // 설문 조회 || 설문 참여자들이 보여지는 설문
// export const getSurvey = (sur_ID) => 
//   axios.get(`${process.env.APIURL}/api/v1/survey/${sur_ID}`);

// // 설문 제출
// export const postSurvey = (sur_ID, answerList) =>
//   axios.post(`${process.env.APIURL}/api/v1/survey/${sur_ID}`, answerList);

// // 설문 생성시 태그 목록 불러오기
// export const getTags = () => 
//   axios.get(`${process.env.APIURL}/api/v1/survey/tags`);

// // 설문 생성시 태그 목록 불러오기
// // 추후 쿠키 및 토큰을 사용하게 되면 email보내는짓은 안함
// export const getMySurveyList = (page_Num: number) =>
//   axios.get(`${process.env.APIURL}/api/v1/survey/myPage?page_Num=${page_Num}`);

// // 설문 삭제
// export const deleteSurvey = (sur_ID) =>
//   axios.delete(`${process.env.APIURL}/api/v1/survey/${sur_ID}`);

// // 설문 수정
// export const modifySurvey = (sur_ID, surveyInsertDTO) =>
//   axios.put(`${process.env.APIURL}/api/v1/survey/${sur_ID}`, surveyInsertDTO);

// // 결과 조회
// export const resultSurvey = (sur_ID) =>
//   axios.get(`${process.env.APIURL}/api/v1/survey/${sur_ID}/result`);

// // 설문 참여 체크
// export const surveyCheck = (sur_ID) =>
//   axios.get(`${process.env.APIURL}/api/v1/survey/${sur_ID}/Check`);

// // 설문 참여 체크
// export const surveySend = (_id, emailList) =>
//   axios.post(`${process.env.APIURL}/api/v1/user/send`, { _id, emailList });
