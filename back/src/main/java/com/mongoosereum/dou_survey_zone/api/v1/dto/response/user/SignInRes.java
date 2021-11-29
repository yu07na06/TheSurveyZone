package com.mongoosereum.dou_survey_zone.api.v1.dto.response.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
@ApiModel("로그인 성공 리스폰스 DTO")
public class SignInRes {

    @ApiModelProperty(name = "user_Email", notes = "유저 Email", example = "test@gmail.com")
    private String user_Email;

    @ApiModelProperty(name = "user_Name", notes = "유저 이름" , example = "홍길동")
    private String user_Name;

    @ApiModelProperty(name = "login_Type", notes = "로그인 타입" , example = "UserPW / TempPW")
    private String login_Type;

    @ApiModelProperty(name = "user_Token", notes = "유저 JWT 인증 토큰")
    private String user_Token;
}
