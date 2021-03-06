package com.mongoosereum.dou_survey_zone.api.v1.dto.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Data
@Builder
@AllArgsConstructor
@ApiModel("ID찾기 DTO")
public class SearchIDReq {

    @NotBlank
    @Size(max = 20)
    @ApiModelProperty(name = "user_Name", notes = "유저 이름", example = "홍길동")
    private String user_Name;

    @NotBlank
    @Size(max = 13, min = 11)
    @ApiModelProperty(name = "user_Tel", notes = "유저 전화번호", example = "전화번호")
    private String user_Tel;

}

