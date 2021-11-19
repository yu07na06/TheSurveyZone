package com.mongoosereum.dou_survey_zone.v1.api.participation.dao;

import com.mongoosereum.dou_survey_zone.v1.api.participation.Repository.PartRepository;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipationDAO implements PartRepository {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public int ACCTotal() {
        return sqlSession.selectOne("countTotal");
    }

    @Override
    public ACC_Age ACCAge() {
        return sqlSession.selectOne("countAge");
    }

    @Override
    public ACC_Gender ACCGender() {
        return sqlSession.selectOne("countGender");
    }
}
