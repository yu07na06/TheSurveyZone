package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Answer;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Question;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SurveyDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SqlSession sqlSession;

    // Select MySQL SurveyTotal
    public long surveyTotal (){
        return sqlSession.selectOne("surveyTotal");
    }

    // Select MySQL SurveyList
    public List<Survey_MySQL> selectSurveyList(PaginationInfo paginationInfo) {
        return sqlSession.selectList("selectSurveyList", paginationInfo);
    }

    public int selectSurveyTotalCount(PageCriteria Criteria) {
        return sqlSession.selectOne("selectSurveyTotalCount", Criteria);
    }

    ;

    public List<Survey_MySQL> selectMySurveyList(PaginationInfo paginationInfo) {
        System.out.println(paginationInfo.getCriteria().getUser_Email());
        return sqlSession.selectList("selectMySurveyList", paginationInfo);
    }

    public int selectMySurveyTotalCount(PageCriteria Criteria) {
        return sqlSession.selectOne("selectMySurveyTotalCount", Criteria);
    }

    ;

    // Insert MongoDB Survey Document
    public String surveyInsert_Mongo(final Survey_Mongo survey) {
        return mongoTemplate.save(survey, "survey").get_id();
    }

    // Insert MySQL Survey Entity
    public int surveyInsert_MySQL(final Survey_MySQL survey) {
        return sqlSession.insert("insertSurvey", survey);
    }

    // Select MongoDB Survey Document by _id
    public Survey_MySQL findById_MySQL(String _id) {
        return sqlSession.selectOne("findById", _id);
    }

    public Survey_Mongo findById_Mongo(String _id) {
        return mongoTemplate.findOne(new Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(_id)), Survey_Mongo.class);
    }

    // Insert MongoDB Survey:AnswerList
    public Integer insertAnswer(final String _id, final List<Answer> answerList) {
        UpdateResult updateResult = null;
        Query query = new Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(_id));
        for (int i = 0; i < answerList.size(); i++) {
            Update update = new Update().push("questionList.$[element].answerList")
                    .each(answerList.get(i))
                    .filterArray(org.springframework.data.mongodb.core.query.Criteria.where("element.SurQue_Order").is(i));
            try {
                updateResult = mongoTemplate.updateMulti(query, update, Survey_Mongo.class);
                System.out.println(updateResult);
                System.out.println("Update Success");
            } catch (Exception e) {
                System.out.println("Update is failed" + e);
                return null;
            }
        }
        return 1;
    }

    public String selectOwner(String _id) {
        return sqlSession.selectOne("selectOwner", _id);
    }

    public int deleteSurvey_MySQL(String _id) {
        return sqlSession.delete("deleteSurvey", _id);
    }

    public Long deleteSurvey_Mongo(String _id) {
        DeleteResult deleteResult = mongoTemplate.remove(
                new Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(_id)),
                Survey_Mongo.class);
        return deleteResult.getDeletedCount();
    }

    public Long updateSurvey_Mongo(Survey_Mongo survey) {
        List<Question> questionList = survey.getQuestionList();
        Query query = new Query(org.springframework.data.mongodb.core.query.Criteria.where("_id").is(survey.get_id()));
        Update update = new Update().set("questionList", questionList);
        UpdateResult updateResult = null;
        try {
            updateResult = mongoTemplate.updateFirst(query, update, Survey_Mongo.class);
        } catch (Exception e) {
            return null;
        }
        return updateResult.getModifiedCount();
    }

    public Integer updateSurvey_MySQL(Survey_MySQL survey) {
        return sqlSession.update("updateSurvey", survey);
    }


    //search  today start survey list Mail send list
    public List<Survey_MySQL> todaySurveyList() {
        return sqlSession.selectList("todaystartlist");
    }

    public Integer todaySurveyUpdate(List<? extends Survey_MySQL> list) {
        System.out.println(list);
        return sqlSession.update("todaystartUpdate", list);
    }

}