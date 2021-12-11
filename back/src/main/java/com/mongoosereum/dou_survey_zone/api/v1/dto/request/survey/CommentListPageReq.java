package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
@ApiModel("페이징 요청 DTO")
public class CommentListPageReq {

    @ApiModelProperty(name = "page_Num", notes = "페이지 번호", example = "1")
    private int page_Num;


    public CommentListPageReq() {
        this.page_Num = 1;
    }

}
