import axios from 'axios';

export const mainUser = () => 
    axios.get(`/api/v1/main/acc`);

export const mainList = (page_Num:number, search_Tag:string, search_Key:string) =>
    axios.get(`/api/v1/main/list/?page_Num=${page_Num}&search_Tag=${search_Tag}&search_Key=${search_Key}`);