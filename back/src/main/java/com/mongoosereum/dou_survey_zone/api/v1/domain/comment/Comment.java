package com.mongoosereum.dou_survey_zone.api.v1.domain.comment;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class Comment {

    private long Com_ID;

    private String _id;

    private String Com_Nickname;

    private String Com_Password;

    private String Com_Context;

    private String Com_Date;

}
