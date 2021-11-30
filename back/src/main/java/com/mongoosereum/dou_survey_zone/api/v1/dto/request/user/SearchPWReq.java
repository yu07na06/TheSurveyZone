package com.mongoosereum.dou_survey_zone.api.v1.dto.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@ApiModel("사용자 비밀번호 찾기")
public class SearchPWReq {

    @NotBlank
    @Email
    @ApiModelProperty(value = "user_Email", notes = "사용자 이메일", example = "ojh2134@gmail.com")
    private String user_Email;

    @NotBlank
    @ApiModelProperty(value = "user_Name", notes = "사용자 이름", example = "오정환")
    private String user_Name;

    @NotBlank
    @Size(max = 13, min = 11)
    @ApiModelProperty(value = "user_Tel", notes = "사용자 전화번호", example = "010-7139-8634")
    private String user_Tel;
}
