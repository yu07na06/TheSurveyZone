import React, { useEffect, useState } from 'react';
import { resultSurvey as resultSurveyAPI } from '../../../lib/api/survey';
import Result from '../UI/Result';
import ErrorSweet from '../../common/modules/ErrorSweet';
import { useHistory } from 'react-router';

const newData = {
    "partList" : {
      "남성" : [0,1,2,3,3,4],
      "여성" : [3,2,1,1,2,1],
      "total" : [3,3,3,4,5,5]
      },
    "sur_Title": "프로젝트 진행도 검사",
    "sur_Content": "더 존 채용 연계형 교육\r\n최종 프로젝트 진행 경과 검사 ",
    "sur_State": 1,
    "sur_StartDate": "2021-12-09",
    "sur_EndDate": "2021-12-10",
    "sur_Publish": true,
    "sur_Img": "https://surveyzone.s3.ap-northeast-2.amazonaws.com/static/f312c1c8-ed4a-4f62-af7b-35557f67bdabthumb-1028257254_MXyWS2Hc_4e90cd69acc3c8f3f591ecc379ecd663d79d4cb2_760x460.jpg",
    "sur_Type": 1,
    "userList": [],
    "questionList": [
      {
        "selectList": [
          {
            "surSel_Content": "2명",
            "surSel_Order": 0
          },
          {
            "surSel_Content": "3명",
            "surSel_Order": 1
          },
          {
            "surSel_Content": "4명",
            "surSel_Order": 2
          }
        ],
        "surQue_QType": 1,
        "surQue_Content": "현재 프로젝트 인원은 몇명인가요??",
        "surQue_MaxAns": 1,
        "surQue_Order": 0,
        "surQue_Essential": true
      },
      {
        "selectList": [
          {
            "surSel_Content": "화목하지 않다",
            "surSel_Order": 0
          },
          {
            "surSel_Content": "0",
            "surSel_Order": 1
          },
          {
            "surSel_Content": "화목하다",
            "surSel_Order": 2
          },
          {
            "surSel_Content": "10",
            "surSel_Order": 3
          }
        ],
        "surQue_QType": 2,
        "surQue_Content": "프로젝트 진행에 있어서 팀원들과 화목함은 어느 정도인가요???",
        "surQue_MaxAns": 0,
        "surQue_Order": 1,
        "surQue_Essential": true
      },
      {
        "selectList": [
          {
            "surSel_Content": "",
            "surSel_Order": null
          }
        ],
        "surQue_QType": 0,
        "surQue_Content": "만약 화목하지 않다고 생각하신다면 무엇이 문제라고 생각하십니까?",
        "surQue_MaxAns": 0,
        "surQue_Order": 2,
        "surQue_Essential": false
      },
      {
        "selectList": [
          {
            "surSel_Content": "",
            "surSel_Order": null
          }
        ],
        "surQue_QType": 0,
        "surQue_Content": "프로젝트 주제는 무엇인가요??",
        "surQue_MaxAns": 0,
        "surQue_Order": 3,
        "surQue_Essential": true
      }
    ],
    "selectList": [
      [
        {
          "surSel_Content": "2명",
          "surSel_Order": 0
        },
        {
          "surSel_Content": "3명",
          "surSel_Order": 1
        },
        {
          "surSel_Content": "4명",
          "surSel_Order": 2
        }
      ],
      [
        {
          "surSel_Content": "화목하지 않다",
          "surSel_Order": 0
        },
        {
          "surSel_Content": "0",
          "surSel_Order": 1
        },
        {
          "surSel_Content": "화목하다",
          "surSel_Order": 2
        },
        {
          "surSel_Content": "10",
          "surSel_Order": 3
        }
      ],
      null,
      null
    ],
    "answerList": [
      [["4명"],["4명"],["3명"],["3명"],["3명"],["4명"],["4명"],["3명"]],
      [["10","0","8","0","2","10","6","4"]],
      [[""],["제가 문젭니다 ㅜㅜ"],[""],["고집으로 똘똘 뭉친 6조"],["진우"],[""],[""],["수면 부족"]],
      [["설문조사"],["설문조사 플랫폼"],["농장 관리 프로그램"],["LINK FARM"],["농장 ERP 프로그램"],["물류 창고 관리"],["설문조사 플랫폼"],["화목"]]
    ],
    "resultMap": [
      {
        "4명": 4,
        "3명": 4,
        "2명": 0
      },
      {"0": 2,"1": 0,"2": 1,"3": 0,"4": 1,"5": 0,"6": 1,"7": 0,"8": 1,"9": 0,"10": 2
      },
      null,
      null
    ],
    "selectResultMap": [
      {
        "2명": [0,0,0,0,0,0,0,0,0,0,0,0
        ],
        "3명": [0,4,0,0,0,0,0,0,0,0,0,0
        ],
        "4명": [0,4,0,0,0,0,0,0,0,0,0,0
        ]
      }
    ]
  }


const ResultComp = ({surveykey}) => {
    const [result, setResult]=useState("");
    const [chartState, setChartState] = useState();
    const history = useHistory();
    
    useEffect(()=>{
        // 임시로 데이터 주입
        // setResult(newData);

        resultSurveyAPI(surveykey)
          .then(res=>{setResult(res.data)})
          .catch(err=> console.log(err));
        // // .catch(err=> ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
    },[])

    const wayBackMySurvey = () => {
      ErrorSweet('success', null, "완료", "내 설문지로 이동합니다.", null)
        .then(() => history.goBack());
    }

    return (
        <>
            <Result 
              result={result} 
              wayBackMySurvey={wayBackMySurvey}
              chartState={chartState}
              setChartState={setChartState}
            />
        </>
    );
};

export default ResultComp;