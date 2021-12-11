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

    let questionList = question.map((value:any, index:any) => {
      let SurType = null;
      switch (value.props.children.key) {
        case 'Sub':
          SurType = 0;
          break;
        case 'Mul':
          SurType = 1;
          break;
        case 'Lin':
          SurType = 2;
          break;
        default: break;
      }

      return {
        surQue_Content: String(data.get(`SurQue_Content${value.key}`)),
        surQue_QType: String(SurType),
        surQue_Essential: data.get(`SurQue_Essential${value.key}`) === 'on' ? true : false,
        surQue_MaxAns: Number(data.get(`surQue_MaxAns${value.key}`)),
        surQue_Order: String(index),
        answerList: [],
        selectList: newQuestionAnsList[index].map((v:any, idx:any) => {
          return {
            surSel_Content: v != null ? String(data.get(v)) : '',
            surSel_Order: v != null ? idx : ''
          };
        })
      };
    });

    let obj: objType = {
      sur_Type: 1,
      sur_Title: String(data.get('Sur_Title')),
      sur_Content: String(data.get('Sur_Content')),
      sur_State: new Date() < day[0] ? 0 : 1,
      sur_StartDate: day[0].getFullYear() + "-" + ('0' + (day[0].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[0].getDate())).slice(-2), 
      sur_EndDate: day[1].getFullYear() + "-" + ('0' + (day[1].getMonth() + 1)).slice(-2) + "-" + ('0' + (day[1].getDate())).slice(-2),
      sur_Publish: !Sur_Publish,
      sur_Image: url,
      sur_Tag: String(data.get(`sur_Tag`)),
      questionList,
    }

    return obj;
}

export default submitOBJ;