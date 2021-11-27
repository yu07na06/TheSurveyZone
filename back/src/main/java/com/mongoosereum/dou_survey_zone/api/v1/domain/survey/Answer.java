package com.mongoosereum.dou_survey_zone.api.v1.domain.survey;

import io.swagger.annotations.ApiParam;
import lombok.*;

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
