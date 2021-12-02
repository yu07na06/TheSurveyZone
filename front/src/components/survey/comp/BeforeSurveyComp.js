import React , { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BeforeSurvey from '../UI/BeforeSurvey';

const BeforeSurveyComp = ({setAge,setSex }) => {
  const marks = [ { value: 10, label: '10대' }, { value: 20, label: '20대' }, { value: 30, label: '30대' }, { value: 40, label: '40대' }, { value: 50, label: '50대' }, { value: 60, label: '60대' } ];
  const sexAge = useSelector(state=>state.submitReducer.beforeData);

  useEffect(()=>{ // 나이와 성별 초기화
    // 나이와 성별을 BeforeSurveyComp에서는 default 값이 찍혀있지만,
    // 제출 시, undefind로 출력
    // 고로 아래의 setAge()와 setSex()를 반드시 해주어야 함을 확인 완료!

    // console.log(sexAge.age, sexAge.sex); // 출력 : 20, "M"
    setAge(sexAge.age);
    setSex(sexAge.sex);
  },[])

  const addStore = (e) => { // 설문 응답 시, 성별/나이 체크 후 다음 버튼 클릭 시, 실행
    // 우리가 알던, e가 아니므로 다르게 사용함을 확인 완료!
    // 성별 변경 시, e._reactName = "onChange" 가 존재함
    // 연령대 변경 시, e._reactName 없음
    (e._reactName==='onChange')? setSex(e.target._wrapperState.initialValue) : setAge(e.target.value)
  }

  return (
    <>
        <BeforeSurvey 
            marks={marks}
            addStore={addStore}
        />
    </>
  );
};

export default BeforeSurveyComp;