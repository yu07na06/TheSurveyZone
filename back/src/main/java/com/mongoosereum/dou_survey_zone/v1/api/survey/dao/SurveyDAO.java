package com.mongoosereum.dou_survey_zone.v1.api.survey.dao;

import com.mongodb.MongoCredential;
import com.mongodb.client.result.UpdateResult;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SurveyDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Survey> findAll(){
        return mongoTemplate.findAll(Survey.class);
    }

    public String save(final Survey survey){
        return mongoTemplate.save(survey,"survey").get_id();
    }

    public String insertAnswer(final AnswerInsertDTO answerInsertDTO) {
        // { questionList : [
        //          {
        //          ...,
        //          answerList : [
        //              {
        //              }
        //          ]
        //          }
        //      ]
        Query query = new Query(Criteria.where("_id").is(answerInsertDTO.get_id()));
        // findById
        List<Answer>answerList = answerInsertDTO.getAnswerList(); // TODO 정환. Optional 추가해야함
        UpdateResult updateResult = null;
        for(int i=0;i<answerList.size();i++) {
            Update update = new Update().push("questionList.$[element].answerList")
                    .each(answerList.get(i)).filterArray(Criteria.where("element.SurQue_Order").is(i));
            try {
                updateResult = mongoTemplate.updateMulti(query, update, Survey.class);
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