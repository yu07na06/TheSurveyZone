package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentListRes {

    Long com_ID;

    String com_Nickname;

    String com_Context;
}
