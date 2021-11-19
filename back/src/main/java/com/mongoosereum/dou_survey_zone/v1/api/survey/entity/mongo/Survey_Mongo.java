package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "survey")
@Data
public class Survey_Mongo {
    @Id
    private String _id;
    private List<Question> questionList;
    @Builder
    public Survey_Mongo(String _id, List<Question> questionList){
        this._id = _id;
        this.questionList= questionList;
    }
}
