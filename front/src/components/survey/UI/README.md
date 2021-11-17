let obj = {
    "Form": {
        "Sur_Title": "", // 설문 제목
        "Sur_Content": "", // 설문 본문
        "Sur_State": "", // 0 : 진행전, 1 : 진행중 , 2 : 마감
        "Sur_StartDate": "", // Date 객체로 던지세요.     ---> comp에서 state로 관리중
        "Sur_EndDate": "",                               ---> comp에서 state로 관리중
        "Sur_Publish": "", // 공개 여부
        "Sur_Img": "", // 이미지 추후에 현재는 제외
        "User_ID": "" // 작성자 ID
    },
    "Question": [ // 질문들어가는 배열인데
        {
            "SurQue_Content": "", // 질문 내용
            "SurQue_QType": "", // 질문 타입 주관식(0), 객관식(1), 선형배율(2)
            "SurQue_Essential": "", // true:필수, false:옵션
            "SurQue_Ans": "", // 보기 갯수
            "SurQue_MaxAns": "", // 최대 선택갯수, 이건 아마 객관식에만 들어갈예정
            "SurQue_Order": "", // 질문의 순서
            "Select": [ // 주관식인 경우, 보내지 말것.
                {
                    "SurSel_Content": "1번 보기", // 보기 내용
                    "SurSel_Order": "1" // 보기 순서
                },
                {
                    "SurSel_Content": "2번 보기",
                    "SurSel_Order": "2"
                }
            ]
        },
        {
            "SurQue_Content": "",
            "SurQue_QType": "",
            "SurQue_Ans": "",
            "SurQue_MaxAns": "",
            "SurQue_Order": "",
            "Select": [
                {
                    "SurSel_Content": "1번 보기",
                    "SurSel_Order": "1"
                },
                {
                    "SurSel_Content": "1번 보기",
                    "SurSel_Order": "1"
                }
            ]
        }
    ]
}