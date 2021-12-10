package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class InsertCommentReq {

    private long Com_ID;

    private String _id;

    private String Com_Nickname;

    private String Com_Password;

    private String Com_Context;

}


