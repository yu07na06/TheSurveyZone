package com.mongoosereum.dou_survey_zone.v1.api.survey;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "survey")
@ToString
@Getter
@Setter
public class Survey {
    @Id
    private String Sur_ID;
    private List<Question> questionList;

    @Builder
    public Survey(List<Question> questionList){
        this.questionList= questionList;
    }
}
