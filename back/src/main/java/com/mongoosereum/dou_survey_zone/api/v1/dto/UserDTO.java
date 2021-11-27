package com.mongoosereum.dou_survey_zone.api.v1.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@ApiModel("유저 DTO")
public class UserDTO {
    @ApiModelProperty(name = "user_Email", notes = "유저 Email")
    private String user_Email;

    @ApiModelProperty(name = "user_Password", notes = "유저 Password")
    private String user_Password;

    @ApiModelProperty(name = "user_Name", notes = "유저 이름")
    private String user_Name;

    @ApiModelProperty(name = "user_Tel", notes = "유저 전화번호")
    private String user_Tel;

    @ApiModelProperty(name = "user_Token", notes = "유저 JWT 인증 토큰")
    private String user_Token;
}
