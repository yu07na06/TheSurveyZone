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
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyDAOImpl implements SurveyDAO {
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

    // Insert MongoDB Survey Document
    @Override
    public Survey_Mongo surveyInsert_Mongo(final Survey_Mongo survey) {
        return mongoTemplate.save(survey, "survey");
    }

    // Insert MySQL Survey Entity
    public void surveyInsert_MySQL(final Survey_MySQL survey) {
        sqlSession.insert("insertSurvey", survey);
    }

    // Select MongoDB Survey Document by _id
    @Override
    public Optional<Survey_MySQL> findById_MySQL(String _id) {
        return Optional.ofNullable(sqlSession.selectOne("findById", _id));
    }

    @Override
    public Optional<Survey_Mongo> findById_Mongo(String _id) {
        return Optional.ofNullable(mongoTemplate.findOne(new Query(Criteria.where("_id").is(_id)), Survey_Mongo.class));
    }

    // Insert MongoDB Survey:AnswerList
    public void insertAnswer(final String _id, final List<Answer> answerList) {
        UpdateResult updateResult = null;
        Query query = new Query(Criteria.where("_id").is(_id));
        for (int i = 0; i < answerList.size(); i++) {
            Update update = new Update().push("questionList.$[element].answerList")
                    .each(answerList.get(i))
                    .filterArray(Criteria.where("element.SurQue_Order").is(i));
                updateResult = mongoTemplate.updateMulti(query, update, Survey_Mongo.class);
                System.out.println(updateResult);
                System.out.println("Update Success");
        }
    }

    public Optional<String> selectOwner(String _id) {
        return Optional.ofNullable(sqlSession.selectOne("selectOwner", _id));
    }

    public void deleteSurvey_MySQL(String _id) {
        sqlSession.delete("deleteSurvey", _id);
    }

    public void deleteSurvey_Mongo(String _id) {
        mongoTemplate.remove(
                new Query(Criteria.where("_id").is(_id)),
                Survey_Mongo.class);
    }

    public void updateSurvey_Mongo(Survey_Mongo survey) {
        List<Question> questionList = survey.getQuestionList();
        Query query = new Query(Criteria.where("_id").is(survey.get_id()));
        Update update = new Update().set("questionList", questionList);
        mongoTemplate.updateFirst(query, update, Survey_Mongo.class);
    }

    public void updateSurvey_MySQL(Survey_MySQL survey) {
        sqlSession.update("updateSurvey", survey);
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