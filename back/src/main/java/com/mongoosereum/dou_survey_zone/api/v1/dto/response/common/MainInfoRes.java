package com.mongoosereum.dou_survey_zone.api.v1.dto.response.common;

import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@ApiModel("메인 페이지 정보 Response DTO")
public class MainInfoRes {
    @ApiModelProperty(name="part_Total",notes = "총합 누적 이용자 수", example = "323")
    Long part_Total;
    @ApiModelProperty(name="part_Age",notes = "누적 이용자 연령대 Map",
            example="{\"age_60\": 14, \"age_50\": 16, \"age_40\": 22, \"age_30\": 23, \"age_20\": 46, \"age_10\": 23}")
    Map<String,Long> part_Age;

    @ApiModelProperty(name="part_Gender",notes = "누적 이용자 성별 Map",
            example="{\"woman\": 0, \"man\": 1 }")
    Map<String,Long> part_Gender;

    @ApiModelProperty(name="sur_Tag",notes = "게시물이 존재하는 Tag List",
            example= "[\n" +
                    "    {\n" +
                    "      \"tag_ID\": 6,\n" +
                    "      \"tag_Name\": \"밥\"\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"tag_ID\": 7,\n" +
                    "      \"tag_Name\": \"연애\"\n" +
                    "    }\n" +
                    "  ]")
    List<Tag> sur_Tag;
}
