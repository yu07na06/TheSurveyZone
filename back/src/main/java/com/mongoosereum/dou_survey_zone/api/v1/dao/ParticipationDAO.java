package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ParticipationDAO{
    @Autowired
    private SqlSession sqlSession;

    public Long ACCTotal() {
        return sqlSession.selectOne("countTotal");
    }
    public Map<String, Long> ACCAge() {
        return sqlSession.selectOne("countAge");
    }
    public Map<String,Long> ACCGender() {
        return sqlSession.selectOne("countGender");
    }
    public int findByIP(String _id, String ip){
        Map<String, String> map = new HashMap<>();
        map.put("Part_IP",ip);
        map.put("_id",_id);
        System.out.println(ip+ " " + _id);
        return sqlSession.selectOne("findByIP", map);
    }
    public int insertParticipation(Participation participation){
        return sqlSession.insert("insertParticipation", participation);
    }
}
