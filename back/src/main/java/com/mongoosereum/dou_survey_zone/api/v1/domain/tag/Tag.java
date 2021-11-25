package com.mongoosereum.dou_survey_zone.api.v1.domain.tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Tag {
    private Integer Tag_ID;
    private String Tag_Name;
}
