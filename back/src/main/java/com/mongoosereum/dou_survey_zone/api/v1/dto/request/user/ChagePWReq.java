package com.mongoosereum.dou_survey_zone.api.v1.dto.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@ApiModel("비밀번호 변경 DTO")
public class ChagePWReq {

    @NotBlank
    @Size(max = 15, min = 8)
    @ApiModelProperty(name = "user_Password", notes = "유저 Password", example = "password123!")
    private String user_Password;

    // 생성자가 없으면 오류 발생
    //Entity클래스를 반환해주는 과정에서 클래스의 JSON Serialize 과정에서 오류가 났었다.
    public ChagePWReq() {}

}
