package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;

import java.util.List;
import java.util.Map;

public interface ParticipationDAO {
        Long ACCTotal();
        Map<String, Long> part_Age_Man();
        Map<String,Long> part_Age_Woman();
        int findByIP(String _id, String ip);
        void insertParticipation(Participation participation);
        List<Participation> resultPart (String _id);
}
