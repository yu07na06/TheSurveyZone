package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.dto.ACC_Age;
import com.mongoosereum.dou_survey_zone.api.v1.dto.ACC_Gender;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipationDAO{
    @Autowired
    private SqlSession sqlSession;

    public int ACCTotal() {
        return sqlSession.selectOne("countTotal");
    }
    public ACC_Age ACCAge() {
        return sqlSession.selectOne("countAge");
    }
    public ACC_Gender ACCGender() {
        return sqlSession.selectOne("countGender");
    }
}
