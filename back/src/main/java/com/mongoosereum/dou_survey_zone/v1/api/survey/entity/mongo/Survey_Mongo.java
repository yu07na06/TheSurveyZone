package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "survey")
@Data
public class Survey_Mongo {
    @Id
    @ApiParam(value="_id", required = true)
    private String _id;

    @ApiParam(value="questionList")
    private List<Question> questionList;
    @Builder
    public Survey_Mongo(String _id, List<Question> questionList){
        this._id = _id;
        this.questionList= questionList;
    }
}
