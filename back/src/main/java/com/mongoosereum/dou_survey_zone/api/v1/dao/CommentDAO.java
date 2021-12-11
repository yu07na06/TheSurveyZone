package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.comment.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentDAO {

    List<Comment> commentlist (PaginationInfo paginationInfo);

    int commentlistTotalCount(PageCriteria pageCriteria);

    void insertComment(Comment comment);

    String checkCommentPW (Comment comment);

    void updateComment(Comment comment);

    void deleteComment(Comment comment);

    Optional<Comment> comment(Comment comment);
}
