## 😆 Welcome!
본 레포지토리는 Douzone 웹 Full Stack 개발자 양성과정 프로그램을 참여하면서 개발한 4인 파이널 프로젝트입니다.

## ✏ 서비스 소개 
### The Survey Zone은 온라인 설문조사 플랫폼입니다.

✅ **기존 N사 혹은 G사의 설문조사는 모집단 특정화가 불가, 공유받은 링크로만 참여가 가능한 단점이 있었습니다.**

🔥 **이를 보안하기 위해 아래와 같은 요소를 강화하는 것을 목표로 했습니다.**
1) 집단에 따른 선택 결과 확인 
2) 커뮤니티(댓글) 및 플랫폼의 역활 증대

⭐ **핵심기능**

<div align=center>
  
| 🙆 **회원**| 🙅 **비회원**| **그 외** |
|:-----------|:-----------|:-----------|
|1. 설문 조사 작성 및 열람<br/>2. 생성 설문지 QR Code, Email 배포<br/>3. 설문조사 시작 및 마감 알람 메일 전송<br/>4. 사전 정보에 따른 통계 결과|1. 설문 조사 태그 및 제목 검색<br/>2. 설문 조사 참여<br/>3. 설문 조사 댓글|1. IP를 통한 설문 조사 중복 검사<br/>2. 반응형 웹 지원<br/>3. 사용자 편의성 강화|

</div>
  
## **🛠 Tech stack**
<div align=center>
<img src = "https://github.com/yu07na06/TheSurveyZone/blob/main/TheSurveyZone_Document/README_IMG/TheSurveyZone_Stack.jpg" width="60%" height="60%">
</div>


## 😏 미리보기
**1. 서비스 소개_WEB**
<div align=center>
<img src = "https://github.com/yu07na06/TheSurveyZone/blob/main/TheSurveyZone_Document/README_IMG/TheSurveyZone_web.gif" width="85%" height="80%">
</br></br>
</div>

**2. 서비스 소개_Mobile**
<div align=center>
<img src = "https://github.com/yu07na06/TheSurveyZone/blob/main/TheSurveyZone_Document/README_IMG/TheSurveyZone_mobile.gif" width="30%" height="40%">
</br></br>
</div>

**3. 결과 조회**
<div align=center>
<img src = "https://github.com/yu07na06/TheSurveyZone/blob/main/TheSurveyZone_Document/README_IMG/TheSurveyZone_result.gif" width="60%" height="70%">
</br></br>
</div>

**4. 인프라**
![image](https://user-images.githubusercontent.com/69469529/172889680-4f0bebf6-5a41-4030-80f7-cb83dd707f1d.png)

- Public Subnet, Private Subnet 분리를 통한 웹 서버로만 접속 가능하도록 구성
- 가용성 보장을 위한 이중화 설정, Redis, MySQL, MongoDB 클러스터 구성을 통한 장애 대응
- AWS VPC 가용영역 a,c 구분, 한 가용 영역의 장애 발생 시 다른 가용 영역의 사용으로 정상 동작 의도
- ALB, Nginx LoadBalancing으로 부하 분산 고려

## ✨ 기대효과
#### - 설문 조사를 통한 피드백
기업이나 개인 단체는 설문 조사를 통해 개선점과 만족도 조사 등 앞으로 나아갈 방향에 대해 조정이 가능합니다.
#### - 커뮤니티 및 참여 활성화
참여자가 로그인없이 참여할 수 있도록하여 많은 참여와 의견을 나누고 공유할 수 있는 댓글 기능을 통해 더 많은 사용자의 참여와
커뮤니티의 활성화를 이끌어낼 수 있을 것입니다.
#### - 다량의 데이터 확보
이에 따른 다량의 데이터가 축적되어 여러 지표로 활용될 수 있을 것입니다.

***
<div align = center>

### 😈 Team Mongoosereum
|Position|🧡 **Frontend** |🧡 **Frontend** |💜 **Backend**|💜 **Backend**|
|:---:|:---:|:---:|:---:|:---:|
|Name|박유나|최진웅|김도훈|오정환|
|Github|[yu07na06](https://github.com/yu07na06)|[20131827](https://github.com/20131827)|[Domo9610](https://github.com/Domo9610)|[Hwa-ning](https://github.com/Hwa-ning)|

</div>

<div align = right>
  
**Edit by 김도훈(Domo9610)**

</div>



