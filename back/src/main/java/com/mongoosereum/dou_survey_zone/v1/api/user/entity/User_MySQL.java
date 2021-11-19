package com.mongoosereum.dou_survey_zone.v1.api.user.entity;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User_MySQL {

    private String user_Email;
    private String user_Password;
    private String user_Name;
    private String user_Tel;

}
