import axios from 'axios';

// 누적이용자 연령,성별,수 등의 데이터 조회
export const mainUser = () => 
    axios.get('/api/v1/main/acc');

// main 검색 기능
export function mainList (page_Num:number, search_Tag:string, search_Key:string){
    return axios.get(`/api/v1/main/list/?page_Num=${page_Num}&search_Tag=${search_Tag}&search_Key=${search_Key}`)
}