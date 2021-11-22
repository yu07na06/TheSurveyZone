package com.mongoosereum.dou_survey_zone.v1.api.participation.dto;

import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;
import com.mongoosereum.dou_survey_zone.v1.api.tag.dao.TagDAO;
import com.mongoosereum.dou_survey_zone.v1.api.tag.entity.Tag;
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
