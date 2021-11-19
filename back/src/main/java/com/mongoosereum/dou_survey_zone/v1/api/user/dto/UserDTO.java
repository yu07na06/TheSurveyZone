package com.mongoosereum.dou_survey_zone.v1.api.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String user_Email;
    private String user_Password;
    private String user_Name;
    private String user_Tel;
    private String user_Token;

}
