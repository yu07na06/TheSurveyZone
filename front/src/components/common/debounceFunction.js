import { debounce } from "lodash";
import ErrorSweet from './modules/ErrorSweet';
import { email as emailAPI, register as registerAPI } from '../../lib/api/auth'; 
import { chartData } from '../../modules/chartReducer';
import { mainList as mainListAPI } from '../../lib/api/home';
import { createSurvey as createSurveyAPI,} from '../../lib/api/survey';
import Swal from 'sweetalert2';
import ClipboardCopy from "./Function";


// 회원가입 시 과도한 enterKey 사용 및 광클을 방지하기 위한 debouncing
export const debounceCheck = debounce((e, registerData, history,setEmailText) => {
    console.log("called debounceSomethingFunc",e);
    if(e._reactName==='onChange'){
        emailAPI({user_Email: e.target.value})
        .then(res=>{ console.log("중복검사 결과값 : ",!res.data);setEmailText(!res.data)})
        .catch(err=> console.log(err));
    }else if(e._reactName==='onSubmit'){
        console.log("registerData : ",registerData);
        registerAPI(registerData)
        .then(()=>{
            console.log("회원가입에 성공(server요청 잘되고 잘받았음)");
            history.push('/LoginPage')
        })
        .catch((err)=>{
            ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null);
        })
    }
}, 444);


// 메인페이지에서 리스트 조회시 enterKey 남발 및 광클에 의한 과도한 api요청을 막기위함
export const debounceText = debounce((pageNum, tagSearch, searchText, setReqMain, dispatch)=>{
    dispatch(chartData());
    mainListAPI(pageNum, tagSearch, searchText)
    .then(res => setReqMain(res.data))
    .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
}, 444);


// 설문생성시 enterKey 남발 및 광클에 의한 과도한 api요청을 막기위함
const debounceCreate = debounce((obj, shareURL, history)=>{
    createSurveyAPI(obj)
        .then((res) => {
          Swal.fire({
            icon: 'info',
            title: '설문지 생성 완료',
            text: shareURL + res.data,
            showDenyButton: true,
            denyButtonText: '복사',
            confirmButtonText: '확인'
          }).then(async (result) => {
            if (result.isDenied) {
              await ClipboardCopy("아님~", shareURL+res.data)
              ErrorSweet('success', null, "복사 성공", "참여 설문 URL 복사", 'url창에 붙여넣기 해보세요.')
            }
            history.push('/MySurveyPage'); // test 기간까지 history 사용하지 않겠다.
          })
        })
        .catch((err) => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
  }, 444);

export default debounceCreate;