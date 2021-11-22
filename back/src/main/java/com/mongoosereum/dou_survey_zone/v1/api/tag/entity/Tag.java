package com.mongoosereum.dou_survey_zone.v1.api.tag.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Tag {
    private String Tag_ID;
    private String Tag_Name;
}
