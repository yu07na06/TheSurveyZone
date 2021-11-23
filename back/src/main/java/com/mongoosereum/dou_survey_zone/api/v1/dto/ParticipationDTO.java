package com.mongoosereum.dou_survey_zone.api.v1.dto;

import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ParticipationDTO {

    private int part_Total;

    private ACC_Gender part_Gender;

    private ACC_Age part_Age;

    private List<Tag> sur_Tag;

}
