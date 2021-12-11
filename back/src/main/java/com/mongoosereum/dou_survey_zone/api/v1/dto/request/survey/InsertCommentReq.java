package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
public class InsertCommentReq {

    private long Com_ID;


    private String _id;

    @NotBlank
    private String Com_Nickname;

    @NotBlank
    private String Com_Password;

    @NotBlank
    private String Com_Context;

}


