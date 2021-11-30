package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.SurveyTag;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Repository
public class TagDAOImpl implements TagDAO {
    @Autowired
    private SqlSession sqlSession;

    /* 존재하는 태그들 */
    public List<Tag> selectTagList(){
        return sqlSession.selectList("selectTagList");
    }

    /* survey에 사용된 태그들  */
    public List<Tag> findById(String _id){
        return sqlSession.selectList("selectExistTagList",_id);
    }

    /*태그 생성*/
    public int insertTag(SurveyTag surveyTag){
        return sqlSession.insert("insertSurveyTag",surveyTag);
    }

}
