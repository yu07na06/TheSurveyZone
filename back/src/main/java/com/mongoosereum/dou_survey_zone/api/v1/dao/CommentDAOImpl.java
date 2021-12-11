package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.comment.Comment;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentDAOImpl implements CommentDAO{

    @Autowired
    private SqlSession sqlSession;

    public List<Comment> commentlist(PaginationInfo paginationInfo) {
        return sqlSession.selectList("commentlist", paginationInfo);
    }

    public int commentlistTotalCount(PageCriteria pageCriteria) {
        return sqlSession.selectOne("commentlistTotalCount", pageCriteria);
    }

    public void insertComment(Comment comment) {
        sqlSession.insert("insertComment", comment);
    }

    public String checkCommentPW (Comment comment) {
        return sqlSession.selectOne("checkCommentPW", comment);
    }


    public void updateComment(Comment comment) {
        sqlSession.insert("updateComment", comment);
    }

    public void deleteComment(Comment comment) {
        sqlSession.delete("deleteComment", comment);
    }

    public Optional<Comment> comment (Comment comment) { return Optional.ofNullable(sqlSession.selectOne("selcetComment",  comment)); }
}
