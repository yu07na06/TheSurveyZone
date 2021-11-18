package com.mongoosereum.dou_survey_zone.v1.api.survey.repository;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends MongoRepository<Survey_Mongo,String>{

}