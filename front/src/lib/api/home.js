import axios from 'axios';

// 누적이용자 연령,성별,수 등의 데이터 조회
export const mainUser = () => 
    axios.get('/api/v1/main/acc');

// main 태그 검색 (page도 함께 요청 필요)
export const mainList = (page_Num, search_Tag, search_Key) => {
    console.log("요청한 값", page_Num, search_Tag, search_Key);
    return axios.get(`/api/v1/main/list/?page_Num=${page_Num}&search_Tag=${search_Tag}&search_Key=${search_Key}`)
}