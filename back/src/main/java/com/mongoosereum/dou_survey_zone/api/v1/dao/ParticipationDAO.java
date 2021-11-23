package com.mongoosereum.dou_survey_zone.api.v1.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
