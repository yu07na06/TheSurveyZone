package com.mongoosereum.dou_survey_zone.api.v1.service;

import com.mongoosereum.dou_survey_zone.api.v1.common.S3Uploader;
import com.mongoosereum.dou_survey_zone.api.v1.dao.ParticipationDAOImpl;
import com.mongoosereum.dou_survey_zone.api.v1.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dao.TagDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Question;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.SurveyTag;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertAnswerReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertSurveyReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.SurveyListPageReq;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ForbiddenException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.NotFoundException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@AllArgsConstructor
@Service
public class SurveyService {

    @Autowired
    private final SurveyDAO surveyDAO;

    @Autowired
    private final UserDAO userDAO;
    @Autowired
    private final TagDAO tagDAO;


    @Autowired
    private final ParticipationDAOImpl participationDAO;

    @Autowired
    private final S3Uploader s3Uploader;

    public SurveyListPageRes selectSurveyList(SurveyListPageReq surveylistDTO) {
        //criteria insert
        PageCriteria criteria = new PageCriteria();
        criteria.setPage_Num(surveylistDTO.getPage_Num());
        criteria.setSearch_Key(surveylistDTO.getSearch_Key());
        criteria.setSearch_Tag(surveylistDTO.getSearch_Tag());

        // paginationInfo insert
        PaginationInfo paginationInfo = new PaginationInfo(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectSurveyTotalCount(criteria);

        paginationInfo.setTotalRecordCount(surveyTotalCount);
        List<Survey_MySQL> surveyList = surveyDAO.selectSurveyList(paginationInfo);
        return SurveyListPageRes.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();
    }

    public SurveyListPageRes selectMySurveyList(String User_Email, SurveyListPageReq surveylistDTO) {
        //criteria insert
        PageCriteria criteria = new PageCriteria();
        criteria.setPage_Num(surveylistDTO.getPage_Num());
        criteria.setUser_Email(User_Email);

        // paginationInfo insert
        PaginationInfo paginationInfo = new PaginationInfo(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectMySurveyTotalCount(criteria);

        // surveylist
        paginationInfo.setTotalRecordCount(surveyTotalCount);
        List<Survey_MySQL> surveyList = surveyDAO.selectMySurveyList(paginationInfo);

        return SurveyListPageRes.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();
    }

    @Transactional
    public String insertSurvey(InsertSurveyReq insertSurveyDTO) /*throws IOException*/ {
        System.out.println("inssertsurvey 서비스 시작");
        // MongoDB insert
        if(insertSurveyDTO.getUser_Email()==null || insertSurveyDTO.getUser_Email().equals("anonymousUser"))
            throw new ForbiddenException(ErrorCode.UNAUTHORIZED_ACCESS);

        User user = userDAO.existsByEmail_MySQL(insertSurveyDTO.getUser_Email())
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_USER));

        Survey_Mongo survey_mongo = surveyDAO.surveyInsert_Mongo(
                Survey_Mongo.builder()
                        .questionList(insertSurveyDTO.getQuestionList())
                        .build());



//        S3 image Upload
//        String imageURL = "";
//        if(insertSurveyDTO.getImage()!= null) {
//            try {
//                imageURL = s3Uploader.upload(insertSurveyDTO.getImage(), "static");
//            } catch (Exception e) {
//                return "IMAGE_UPLOAD_FAIL";
//            }
//        }

        // MySQL insert by MongoDB.id
        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                ._id(survey_mongo.get_id())
                .sur_Title(insertSurveyDTO.getSur_Title())
                .sur_Content(insertSurveyDTO.getSur_Content())
                .sur_State(insertSurveyDTO.getSur_State().getNum())
                .sur_StartDate(insertSurveyDTO.getSur_StartDate())
                .sur_EndDate(insertSurveyDTO.getSur_EndDate())
                .sur_Publish(insertSurveyDTO.getSur_Publish())
                .sur_Img(insertSurveyDTO.getSur_Image() /*imageURL*/ )
                .user_Email(user.getUser_Email())
                .sur_Type(insertSurveyDTO.getSur_Type().getNum())
                .tag_ID(insertSurveyDTO.getSur_Tag())
                .build();

        try {
            surveyDAO.surveyInsert_MySQL(survey_MySQL);
            if(insertSurveyDTO.getSur_Tag() != null) {
                SurveyTag surveyTag = SurveyTag.builder()
                        ._id(survey_mongo.get_id())
                        .Tag_ID(insertSurveyDTO.getSur_Tag())
                        .build();
                tagDAO.insertTag(surveyTag);
            }
        } catch (Exception e) {
            System.out.println("에러발생");
            e.printStackTrace();
            surveyDAO.deleteSurvey_Mongo(survey_mongo.get_id());
        }
        return survey_mongo.get_id();
    }

    public List<Tag> selectTagList() {
        return tagDAO.selectTagList();
    }

    public List<Tag> selectTagExistList(String _id) {
        return tagDAO.findById(_id);
    }

    @Transactional(rollbackFor = NotFoundException.class)
    public SurveyPartCheckRes checkPart(String _id, HttpServletRequest request){
        String ip = getIP(request);
        Survey_MySQL survey_mySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));
        return SurveyPartCheckRes.builder()
                .check_State(survey_mySQL.getSur_State())
                .check_IP(participationDAO.findByIP(_id, ip) < 1)
                .build();
    }

    public SelectSurveyRes findById(String _id) {
        Survey_MySQL resultMySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_Mongo resultMongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        List<Tag> tagList = tagDAO.findById(_id);
        SelectSurveyRes surveySelectDTO = new SelectSurveyRes();
        surveySelectDTO.set(resultMongo, resultMySQL, tagList);
        return surveySelectDTO;
    }

    @Transactional(rollbackFor = NotFoundException.class)
    public void insertAnswer(String _id, InsertAnswerReq insertAnswerReq, HttpServletRequest request) {
        String ip = getIP(request);
        if(participationDAO.findByIP(_id,ip) == 1) // 이미 응답한 IP.
            throw new ForbiddenException(ErrorCode.ALREADY_PARTICIPATION);
        participationDAO.insertParticipation(
                Participation.builder()
                        ._id(_id)
                        .Part_Age(insertAnswerReq.getAge())
                        .Part_Gender(insertAnswerReq.getGender().charAt(0))
                        .Part_IP(ip)
                        .build()
        );
        surveyDAO.insertAnswer(_id, insertAnswerReq.getAnswerList());
    }

    @Transactional
    public void deleteSurvey(String _id, String User_Email) {
        String owner = surveyDAO.selectOwner(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        if(!owner.equals(User_Email))
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        surveyDAO.deleteSurvey_MySQL(_id);
        surveyDAO.deleteSurvey_Mongo(_id);
    }

    public Boolean checkOwner(String _id, String User_Email){
        String owner = surveyDAO.selectOwner(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));
        if(!owner.equals(User_Email))
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        return owner.equals(User_Email)? true: false;
    }
    @Transactional(rollbackFor = Exception.class)
    public void updateSurvey(String _id, InsertSurveyReq surveyInsertDTO) {
        // MongoDB insert
        Survey_MySQL survey_MySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_Mongo survey_Mongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        survey_Mongo.setQuestionList(surveyInsertDTO.getQuestionList());
        survey_MySQL.set(surveyInsertDTO);

        System.out.println(survey_MySQL.getSur_State());
        System.out.println(surveyInsertDTO.getSur_State());

        surveyDAO.updateSurvey_Mongo(survey_Mongo);
        surveyDAO.updateSurvey_MySQL(survey_MySQL);
    }

    public SurveyResultRes resultSurvey(String User_Email, String _id) {
        if(!User_Email.equals(surveyDAO.selectOwner(_id)
                .orElseThrow(() ->
                                new NotFoundException(ErrorCode.NOT_FOUND_SURVEY))
        ) )
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        Survey_Mongo survey_mongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_MySQL survey_mySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        List<Question> questionList = survey_mongo.getQuestionList();
        SurveyResultRes surveyResultDTO = new SurveyResultRes();

        surveyResultDTO.setSurvey(survey_mySQL);

        for (int i = 0; i < questionList.size(); i++) {
            Question nowQuestion = questionList.get(i);
            surveyResultDTO.setQuestion(nowQuestion);
            
            // TODO 정환. 유저 정보를 담게 변경되는 경우 아래 코드 추가해야함
            // surveyResultDTO.getUserList().add(questionList.get(i).getUserInfo());

            List<Object> ansList = new ArrayList<>(); // 제출한 응답을 담을 ArrayList
            //객관식 유형
            switch (nowQuestion.getSurQue_QType()) {
                /*case QuestionType.ESSAY: 주관식 */
                case 0: {
                    surveyResultDTO.getSelectList().add(null); // Select가 없으므로 null
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        String ans = nowQuestion.getAnswerList().get(j).getSurAns_Content();
                        ansList.add(ans);
                    }
                    surveyResultDTO.getResultMap().add(null); // Select가 없으므로 resultMap도 null
                    break;
                }
                /*case QuestionType.MULTIPLE : 객관식 */
                case 1: {
                    Map<String, Long> resultMap = new HashMap<>(); // 객관식용 HashMap
                    for (int j = 0; j < nowQuestion.getSelectList().size(); j++)
                        resultMap.put(nowQuestion.getSelectList().get(j).getSurSel_Content(), 0L);
                    surveyResultDTO.getSelectList().add(nowQuestion.getSelectList()); // DTO에 selectList추가
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        String ans[] = nowQuestion.getAnswerList().get(j).getSurAns_Content().split("Θ");
                        if (ans.length == 1) { // 중복응답이 아닌경우
                            ansList.add(ans[0]); // 제출한 응답 리스트에 추가
                            if (resultMap.containsKey(ans[0])) // Map에 답변이 존재
                                resultMap.put(ans[0], resultMap.get(ans[0]) + 1);
                        } else { // 중복응답인 경우
                            ansList.add(ans);
                            for (int k = 0; k < ans.length; k++) { // 중복응답의 갯수만큼 for문 반복
                                if (resultMap.containsKey(ans[k])) // Map에 답변이 존재
                                    resultMap.put(ans[k], resultMap.get(ans[k]) + 1);
                            }
                        }
                    }
                    surveyResultDTO.getResultMap().add(resultMap);
                    break;
                }
                /* case QuestionType.LINEAR : 선형배율*/
                case 2: {
                    Map<String, Long> resultMap = new HashMap<>();
                    int min = Integer.parseInt(nowQuestion.getSelectList().get(1).getSurSel_Content());
                    int max = Integer.parseInt(nowQuestion.getSelectList().get(3).getSurSel_Content());
                    // value 최소 index(1), value 최대 index(3)
                    for (int j = min; j <= max; j++)
                        resultMap.put(String.valueOf(j), 0L);

                    surveyResultDTO.getSelectList().add(nowQuestion.getSelectList()); // DTO에 selectList추가
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        String ans = nowQuestion.getAnswerList().get(j).getSurAns_Content();
                        ansList.add(ans); // 제출한 응답 리스트에 추가
                        if (resultMap.containsKey(ans)) // Map에 답변이 존재
                            resultMap.put(ans, resultMap.get(ans) + 1);
                    }
                    surveyResultDTO.getResultMap().add(resultMap);
                    break;
                }
            }
            surveyResultDTO.getAnswerList().add(ansList); // 이번 질문에 대한 모든 ansList를 추가
        }
        return surveyResultDTO;
    }
    public String getIP(HttpServletRequest request){
        String ip = null;
        String[] header = new String []{
                "X-Forwarded-For",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_CLIENT_IP",
                "HTTP_X_FORWARDED_FOR"
        };
        for(int i=0;i<header.length;i++){
            ip = request.getHeader(header[i]);
            if(ip != null)
                return ip;
        }
        return request.getRemoteAddr();
    }
}