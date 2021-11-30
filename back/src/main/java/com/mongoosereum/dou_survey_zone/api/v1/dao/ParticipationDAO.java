package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;
import java.util.Map;

public interface ParticipationDAO {
        Long ACCTotal();
        Map<String, Long> ACCAge();
        Map<String,Long> ACCGender();
        int findByIP(String _id, String ip);
        void insertParticipation(Participation participation);
}
