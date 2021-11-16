package com.mongoosereum.dou_survey_zone.v1.api.survey.dao;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
        return mongoTemplate.save(survey,"survey").getSur_ID();
    }
}