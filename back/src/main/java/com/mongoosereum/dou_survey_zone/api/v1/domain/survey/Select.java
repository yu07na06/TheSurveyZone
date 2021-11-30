package com.mongoosereum.dou_survey_zone.api.v1.domain.survey;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Builder
@AllArgsConstructor
@Data
@Document(collection="select")
@ApiModel("질문 선택지, 객관식 선형배율 전용")
public class Select {
//    @Id
//    private String SurSel_ID;
    @NotBlank
    @ApiModelProperty(name="SurSel_Content", value="보기 내용", example = "햄버거")
    private String SurSel_Content;

    @NotBlank
    @ApiModelProperty(name="SurSel_Content", value="보기 순서", example = "1")
    private Long SurSel_Order;
}
