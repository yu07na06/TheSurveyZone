
// mainPage에서 paging처리할때 사용될 dataType
export interface pagingType {
  pageNum:number;
  tagSearch:string|undefined;
  searchText:string|undefined;
}

export interface objType {
    sur_Type: number;
    sur_Title: string
    sur_Content: string
    sur_State: number
    sur_StartDate: string;
    sur_EndDate: string;
    sur_Publish: boolean;
    sur_Image: string;
    sur_Tag: string | null;
    questionList: questionType[];
  };
  
  interface questionType {
    surQue_Content: string;
    surQue_QType: string;
    surQue_Essential: boolean;
    surQue_MaxAns: number | null;
    surQue_Order: string;
    answerList: (string | null)[];
    selectList: selectType[]
  }
  
interface selectType {
    surSel_Content: string | null;
    surSel_Order: number | null;
}

function submitOBJ(e:any, question_ans:any, question:any, day:any, Sur_Publish:any, url:any){
    const data = new FormData(e.currentTarget);

    let newQuestionAnsList:any[] = [];
    for (const key in question_ans) {
      newQuestionAnsList.push(question_ans[key]);
    }

    let questionList = question.map((value:any, index:any) => { // 질문 들어가는 배열
      let SurType = null;
      switch (value.props.children.type.name) {
        case 'SubjectiveComp':
          SurType = 0; // 주관식
          break;
        case 'MultipleChoiceComp':
          SurType = 1; // 객관식  
          break;
        case 'LinearMagnificationComp':
          SurType = 2; // 선형배율
          break;
        default: break;
      }

      return {
        surQue_Content: String(data.get(`SurQue_Content${value.key}`)), // 질문 내용
        surQue_QType: String(SurType), // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
        surQue_Essential: data.get(`SurQue_Essential${value.key}`) === 'on' ? true : false, // true:필수, false:옵션
        surQue_MaxAns: Number(data.get(`surQue_MaxAns${value.key}`)), // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
        surQue_Order: String(index), // 질문의 순서
        answerList: [],
        selectList: newQuestionAnsList[index].map((v:any, idx:any) => { // 객관식만 처리한 상태이므로, 주관식과 선형배율 error(수정 부탁)
          return {
            surSel_Content: v != null ? String(data.get(v)) : '', // 보기 내용 --> 주관식의 경우, ''빈값으로 보냄
            surSel_Order: v != null ? idx : '' // 보기 순서 --> 주관식의 경우, ''빈값으로 보냄
          };
        })
      };
    });

    let obj: objType = {
      sur_Type: 1, // 오정환 주입! 일단 하라고 하시넹 오키
      sur_Title: String(data.get('Sur_Title')), // 설문 제목
      sur_Content: String(data.get('Sur_Content')), // 설문 본문
      sur_State: new Date() < day[0] ? 0 : 1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
      sur_StartDate: day[0].getFullYear() + "-" + ('0' + (day[0].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[0].getDate())).slice(-2), // Date 객체로 던지세요.     ---> comp에서 state로 관리중
      sur_EndDate: day[1].getFullYear() + "-" + ('0' + (day[1].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[1].getDate())).slice(-2),                               // ---> comp에서 state로 관리중
      sur_Publish: !Sur_Publish, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
      sur_Image: url,
      sur_Tag: String(data.get(`sur_Tag`)),
      questionList,
    }

    return obj;
}

export default submitOBJ;



// // mainPage에서 paging처리할때 사용될 dataType
// export interface pagingType {
//   pageNum:number;
//   tagSearch:string|undefined;
//   searchText:string|undefined;
// }

// export interface objType {
//     sur_Type: number;
//     sur_Title: string
//     sur_Content: string
//     sur_State: number
//     sur_StartDate: string;
//     sur_EndDate: string;
//     sur_Publish: boolean;
//     sur_Image: string;
//     sur_Tag: string | null;
//     questionList: questionType[];
//   };
  
//   interface questionType {
//     surQue_Content: string;
//     surQue_QType: number;
//     surQue_Essential: boolean;
//     surQue_MaxAns: number | null;
//     surQue_Order: number;
//     answerList: (string | null)[];
//     selectList: selectType[]
//   }
  
// interface selectType {
//     surSel_Content: string | null;
//     surSel_Order: number | null;
// }

// function submitOBJ(e:any, question_ans:any, question:any, day:any, Sur_Publish:any, url:any){
//     const data = new FormData(e.currentTarget);

//     let newQuestionAnsList:any[] = [];
//     for (const key in question_ans) {
//       newQuestionAnsList.push(question_ans[key]);
//     }

//     let questionList = question.map((value:any, index:any) => { // 질문 들어가는 배열
//       let SurType = null;
//       switch (value.props.children.type.name) {
//         case 'SubjectiveComp':
//           SurType = 0; // 주관식
//           break;
//         case 'MultipleChoiceComp':
//           SurType = 1; // 객관식  
//           break;
//         case 'LinearMagnificationComp':
//           SurType = 2; // 선형배율
//           break;
//         default: break;
//       }

//       return {
//         surQue_Content: String(data.get(`SurQue_Content${value.key}`)), // 질문 내용
//         surQue_QType: SurType, // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
//         surQue_Essential: data.get(`SurQue_Essential${value.key}`) === 'on' ? true : false, // true:필수, false:옵션
//         surQue_MaxAns: Number(data.get(`surQue_MaxAns${value.key}`)), // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
//         surQue_Order: index, // 질문의 순서
//         answerList: [],
//         selectList: newQuestionAnsList[index].map((v:any, idx:any) => { // 객관식만 처리한 상태이므로, 주관식과 선형배율 error(수정 부탁)
//           return {
//             surSel_Content: v != null ? String(data.get(v)) : '', // 보기 내용 --> 주관식의 경우, ''빈값으로 보냄
//             surSel_Order: v != null ? idx : '' // 보기 순서 --> 주관식의 경우, ''빈값으로 보냄
//           };
//         })
//       };
//     });

//     let obj: objType = {
//       sur_Type: 1, // 오정환 주입! 일단 하라고 하시넹 오키
//       sur_Title: String(data.get('Sur_Title')), // 설문 제목
//       sur_Content: String(data.get('Sur_Content')), // 설문 본문
//       sur_State: new Date() < day[0] ? 0 : 1, // 0 : 진행전, 1 : 진행중 , 2 : 마감
//       sur_StartDate: day[0].getFullYear() + "-" + ('0' + (day[0].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[0].getDate())).slice(-2), // Date 객체로 던지세요.     ---> comp에서 state로 관리중
//       sur_EndDate: day[1].getFullYear() + "-" + ('0' + (day[1].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[1].getDate())).slice(-2),                               // ---> comp에서 state로 관리중
//       sur_Publish: !Sur_Publish, // 공개 여부                ---> comp에서 state로 관리중 [ !false: 공개, !true: (잠금)비공개 ]
//       sur_Image: url,
//       sur_Tag: String(data.get(`sur_Tag`)),
//       questionList,
//     }

//     return obj;
// }

// export default submitOBJ;