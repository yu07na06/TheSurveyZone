import { debounce } from "lodash";
import Swal from 'sweetalert2';
import { email as emailAPI, register as registerAPI } from '../../lib/api/auth';
import { mainList as mainListAPI } from '../../lib/api/home';
import { createSurvey as createSurveyAPI } from '../../lib/api/survey';
import { chartData } from '../../modules/chartReducer';
import ClipboardCopy from "./Function";
import ErrorSweet from './modules/ErrorSweet';

export const debounceCheck = debounce((e, registerData, history,setEmailText) => {
    if(e._reactName==='onChange'){
        emailAPI({user_Email: e.target.value})
          .then(res => setEmailText(!res.data))
    }else if(e._reactName==='onSubmit'){
        registerAPI(registerData)
          .then(() => history.push('/LoginPage'))
          .catch( err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null) );
    }
}, 444);

export const debounceText = debounce((pageNum, tagSearch, searchText, setReqMain, dispatch)=>{
  dispatch(chartData());
  mainListAPI(pageNum, tagSearch, searchText)
    .then(res => setReqMain(res.data))
    .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
}, 444);

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
        history.push('/MySurveyPage');
      })
    })
      .catch( err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
  }, 444);

export default debounceCreate;