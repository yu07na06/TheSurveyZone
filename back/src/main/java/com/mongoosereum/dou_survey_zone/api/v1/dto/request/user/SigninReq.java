package com.mongoosereum.dou_survey_zone.api.v1.dto.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@Builder
@AllArgsConstructor
@ApiModel("로그인 DTO")
public class SigninReq {

    @NotBlank
    @Email
    @Size(max = 45)
    @ApiModelProperty(name = "user_Email", notes = "유저 Email", example = "test@gmail.com")
    private String user_Email;

    @NotBlank
    @Size(max = 15, min = 8)
    @ApiModelProperty(name = "user_Password", notes = "유저 Password", example = "password123!")
    private String user_Password;
}
