package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
@Builder
@AllArgsConstructor
public class DeleteCommentReq {

    @NotBlank
    private long Com_ID;

    @NotBlank
    private String Com_Password;

}