package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
public class Answer {
//    @Id
//    private String SurAns_ID;
    @ApiParam(value = "설문 답변 내용", required = true)
    private String SurAns_Content;
    //private String User_Email;

    @Builder
    public Answer(String SurAns_Content) {
        this.SurAns_Content = SurAns_Content;
    }
}
