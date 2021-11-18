package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "survey")
@ToString
@Getter
@Setter
public class Survey_Mongo {
    @Id
    private String sur_ID;
    private List<Question> questionList;

    @Builder
    public Survey_Mongo(List<Question> questionList){
        this.questionList= questionList;
    }
}
