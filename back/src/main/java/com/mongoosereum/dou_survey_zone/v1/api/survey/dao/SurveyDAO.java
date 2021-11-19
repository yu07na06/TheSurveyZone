package com.mongoosereum.dou_survey_zone.v1.api.survey.dao;

import com.mongodb.client.result.UpdateResult;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Repository
public class SurveyDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SqlSession sqlSession;

    //    public List<Survey_MySQL> findAll(){
    //        return sqlSession.selectList("selectSurveyList",Survey_MySQL.class);
    //    }

    // Select MySQL SurveyList
    public List<Survey_MySQL> selectSurveyList(){
        return sqlSession.selectList("selectSurveyList");
    }

    // Insert MongoDB Survey Document
    public String surveyInsert_Mongo(final Survey_Mongo survey){
        return mongoTemplate.save(survey,"survey").get_id();
    }
    // Insert MySQL Survey Entity
    public Integer surveyInsert_MySQL(final Survey_MySQL survey){
        return sqlSession.insert("insertSurvey",survey);
    }

    // Select MongoDB Survey Document by _id
    public Survey_MySQL findById_MySQL(String _id){
        return sqlSession.selectOne("findById",_id);
    }
    public Survey_Mongo findById_Mongo(String _id){
        return mongoTemplate.findOne(new Query(Criteria.where("_id").is(_id)),Survey_Mongo.class);
    }

    // Insert MongoDB Survey:AnswerList
    public Integer insertAnswer(final String _id, final List<Answer>answerList) {
        UpdateResult updateResult = null;
        Query query = new Query(Criteria.where("_id").is(_id));
        for(int i=0;i<answerList.size();i++) {
            Update update = new Update().push("questionList.$[element].answerList")
                    .each(answerList.get(i))
                    .filterArray(Criteria.where("element.SurQue_Order").is(i));
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

    public String selectOwner(String _id){
        return sqlSession.selectOne("selectOwner", _id);
    }

    public Integer deleteSurvey(String _id){
        return sqlSession.delete("deleteSurvey",_id);
    }
    public Long updateSurvey_Mongo(Survey_Mongo survey){
        List<Question> questionList = survey.getQuestionList();
        Query query = new Query(Criteria.where("_id").is(survey.get_id()));
        Update update = new Update().set("questionList",questionList);
        UpdateResult updateResult = null;
        try {
            updateResult = mongoTemplate.updateFirst(query, update, Survey_Mongo.class);
        } catch (Exception e) {
            return null;
        }
        return updateResult.getModifiedCount();
    }
    public Integer updateSurvey_MySQL(Survey_MySQL survey){
        return sqlSession.update("updateSurvey",survey);
    }
}