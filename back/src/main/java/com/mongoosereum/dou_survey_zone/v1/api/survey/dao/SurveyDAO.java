package com.mongoosereum.dou_survey_zone.v1.api.survey.dao;

import com.mongodb.client.result.UpdateResult;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveySelectDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
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

    public List<Survey_Mongo> findAll(){
        return mongoTemplate.findAll(Survey_Mongo.class);
    }

    public SurveySelectDTO findById(String sur_ID){
        // findById MySQL
        Survey_MySQL resultSQL = sqlSession.selectOne("findById",sur_ID);
        // findById Mongo
        Survey_Mongo resultMongo = mongoTemplate.findOne(new Query(Criteria.where("_id").is(sur_ID)),Survey_Mongo.class);
        SurveySelectDTO surveySelectDTO = new SurveySelectDTO();
        surveySelectDTO.set(resultMongo,resultSQL);
        return surveySelectDTO;
    }
    public List<Survey_MySQL> selectSurveyList(){
        return sqlSession.selectList("selectSurveyList");
    }

    public String surveyInsert_Mongo(final Survey_Mongo survey){
        return mongoTemplate.save(survey,"survey").getSur_ID();
    }

    public Integer surveyInsert_MySQL(final Survey_MySQL survey){
        return sqlSession.insert("insertSurvey",survey);
    }

    public String insertAnswer(final String _id, final List<Answer>answerList) {
        Query query = new Query(Criteria.where("_id").is(_id));
        // findById
        UpdateResult updateResult = null;
        for(int i=0;i<answerList.size();i++) {
            Update update = new Update().push("questionList.$[element].answerList")
                    .each(answerList.get(i)).filterArray(Criteria.where("element.SurQue_Order").is(i));
            try {
                updateResult = mongoTemplate.updateMulti(query, update, Survey_Mongo.class);
                System.out.println("Updated Successfully");
                System.out.println(updateResult);
            } catch (Exception e) {
                System.out.println("Update is failed" + e);
                return "Fail";
            }
        }
        return "Success";
    }
}