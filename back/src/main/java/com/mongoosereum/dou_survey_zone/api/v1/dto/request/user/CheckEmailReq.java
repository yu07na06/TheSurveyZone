package com.mongoosereum.dou_survey_zone.api.v1.dto.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Data
@Builder
@AllArgsConstructor
@ApiModel("이메일 체크 DTO")
public class CheckEmailReq {

    @NotBlank
    @Email
    @ApiModelProperty(name = "user_Email", notes = "유저 Email", example = "test@gmail.com")
    private String user_Email;

    // 생성자가 없으면 오류 발생
    //Entity클래스를 반환해주는 과정에서 클래스의 JSON Serialize 과정에서 오류가 났었다.
    public CheckEmailReq() {}
}

