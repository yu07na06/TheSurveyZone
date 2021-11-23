package com.mongoosereum.dou_survey_zone.v1.api.survey.service;

import com.mongoosereum.dou_survey_zone.v1.api.common.paging.Criteria_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.common.paging.PaginationInfo_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyResultDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveylistDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.QuestionType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Select;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Surveylist_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.tag.dao.TagDAO;
import com.mongoosereum.dou_survey_zone.v1.api.tag.entity.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@AllArgsConstructor
@Service
public class SurveyService {

    @Autowired
    private final SurveyDAO surveyDAO;
    @Autowired
    private final TagDAO tagDAO;

    public Surveylist_MySQL selectSurveyList(SurveylistDTO surveylistDTO) {

        //criteria insert
        Criteria_MySQL criteria = new Criteria_MySQL();
        criteria.setPage_Num(surveylistDTO.getPage_Num());
        criteria.setSearch_Key(surveylistDTO.getSearch_Key());
        criteria.setSearch_Tag(surveylistDTO.getSearch_Tag());

        // paginationInfo insert
        PaginationInfo_MySQL paginationInfo = new PaginationInfo_MySQL(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectSurveyTotalCount(criteria);

        // surveylist
        List<Survey_MySQL> surveyList = Collections.emptyList();
        if (0 < surveyTotalCount) {
            paginationInfo.setTotalRecordCount(surveyTotalCount);
            surveyList = surveyDAO.selectSurveyList(paginationInfo);
        }

        // insert total info
        Surveylist_MySQL response = Surveylist_MySQL.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();

        return response;
    }

    public Surveylist_MySQL selectMySurveyList(String User_Email) {
        //criteria insert
        Criteria_MySQL criteria = new Criteria_MySQL();
        criteria.setUser_Email(User_Email);

        // paginationInfo insert
        PaginationInfo_MySQL paginationInfo = new PaginationInfo_MySQL(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectSurveyTotalCount(criteria);

        // surveylist
        List<Survey_MySQL> surveyList = Collections.emptyList();
        if (0 < surveyTotalCount) {
            paginationInfo.setTotalRecordCount(surveyTotalCount);
            surveyList = surveyDAO.selectSurveyList(paginationInfo);
        }

        // insert total info
        Surveylist_MySQL response = Surveylist_MySQL.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();

        return response;
    }

    public List<Tag> selectTagList() {
        return tagDAO.selectTagList();
    }

    public List<Tag> selectTagExistList(String _id) {
        return tagDAO.findById(_id);
    }

    public String insertSurvey(InsertSurveyDTO insertSurveyDTO) {
        // MongoDB insert
        Survey_Mongo survey_Mongo = Survey_Mongo.builder()
                .questionList(insertSurveyDTO.getQuestionList())
                .build();
        String surveyID = surveyDAO.surveyInsert_Mongo(survey_Mongo);

        // MySQL insert by MongoDB.id
        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                ._id(surveyID)
                .sur_Title(insertSurveyDTO.getSur_Title())
                .sur_Content(insertSurveyDTO.getSur_Content())
                .sur_State(insertSurveyDTO.getSur_State().getNum())
                .sur_StartDate(insertSurveyDTO.getSur_StartDate())
                .sur_EndDate(insertSurveyDTO.getSur_EndDate())
                .sur_Publish(insertSurveyDTO.getSur_Publish())
                .sur_Image(insertSurveyDTO.getSur_Image())
                .user_Email(insertSurveyDTO.getUser_Email())
                .sur_Type(insertSurveyDTO.getSur_Type().getNum())
                .build();
        try {
            surveyDAO.surveyInsert_MySQL(survey_MySQL);
//            SurveyTag surveyTag = SurveyTag.builder()
//                                    ._id(surveyID)
//                                    .Tag_ID(insertSurveyDTO.getSur_Tag())
//                                    .build();
//            tagDAO.insertTag(surveyTag);
        } catch (Exception e) {
            // Insert에 실패한경우 생성된 MongoDB의 Document를 삭제해줘야함
            surveyDAO.deleteSurvey_Mongo(surveyID);
            return "FAIL";
        }
        return surveyID;
    }

    public SelectSurveyDTO findById(String _id) {
        Survey_MySQL resultMySQL = surveyDAO.findById_MySQL(_id);
        Survey_Mongo resultMongo = surveyDAO.findById_Mongo(_id);
        List<Tag> tagList = tagDAO.findById(_id);
        SelectSurveyDTO surveySelectDTO = new SelectSurveyDTO();
        surveySelectDTO.set(resultMongo, resultMySQL, tagList);
        return surveySelectDTO;
    }

    @Transactional(rollbackFor = Exception.class)
    public Integer insertAnswer(String _id, List<Answer> answerList) {
        return surveyDAO.insertAnswer(_id, answerList);
    }

    @Transactional(rollbackFor = Exception.class)
    public Long deleteSurvey(String _id, String User_Email) {
        String owner = surveyDAO.selectOwner(_id);
        if (!owner.equals(User_Email)) {
            return 0L;
        }
        surveyDAO.deleteSurvey_MySQL(_id);
        return surveyDAO.deleteSurvey_Mongo(_id);
    }

    @Transactional(rollbackFor = Exception.class)
    public Boolean updateSurvey(String _id, InsertSurveyDTO surveyInsertDTO) throws Exception {
        // MongoDB insert
        Survey_Mongo survey_Mongo = Survey_Mongo.builder()
                ._id(_id)
                .questionList(surveyInsertDTO.getQuestionList())
                .build();

        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                ._id(_id)
                .sur_Title(surveyInsertDTO.getSur_Title())
                .sur_Content(surveyInsertDTO.getSur_Content())
                .sur_State(surveyInsertDTO.getSur_State().getNum())
                .sur_StartDate(surveyInsertDTO.getSur_StartDate())
                .sur_EndDate(surveyInsertDTO.getSur_EndDate())
                .sur_Publish(surveyInsertDTO.getSur_Publish())
                .sur_Image(surveyInsertDTO.getSur_Image())
                .user_Email(surveyInsertDTO.getUser_Email())
                .sur_Type(surveyInsertDTO.getSur_Type().getNum())
                .build();

        Long resultMongo = surveyDAO.updateSurvey_Mongo(survey_Mongo);
        if (resultMongo == 0L)
            throw new Exception("IMPOSSIBLE TO UPDATE");
        // MySQL insert by MongoDB.id
        Integer resultMySQL = surveyDAO.updateSurvey_MySQL(survey_MySQL);
//        if (resultMySQL.equals("500")|| resultMySQL.equals("500"))
//            throw new Exception("Failed to ");
//        if(surveyDAO.surveyUpdate_MySQL(survey_MySQL)!=0 && surveyDAO.surveyUpdate_Mongo(survey_Mongo)!= 0L)
//            return true;
        if (resultMySQL >= 1)
            return true;
        else
            throw new Exception("IMPOSSIBLE TO UPDATE");
    }

    public SurveyResultDTO resultSurvey(String _id) {
        Survey_Mongo survey_mongo = surveyDAO.findById_Mongo(_id);
        if(survey_mongo == null)
            return null;
        List<Question> questionList = survey_mongo.getQuestionList();
        SurveyResultDTO surveyResultDTO = new SurveyResultDTO();
        for (int i = 0; i < questionList.size(); i++) {
            Question nowQuestion = questionList.get(i);
            surveyResultDTO.getQuestionList().add(questionList.get(i).getSurQue_Content()); // 질문추가
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
}