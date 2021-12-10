package com.mongoosereum.dou_survey_zone.api.v1.domain.user;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String user_Email;
    private String user_Password;
    private String user_Name;
    private String user_Tel;
}
