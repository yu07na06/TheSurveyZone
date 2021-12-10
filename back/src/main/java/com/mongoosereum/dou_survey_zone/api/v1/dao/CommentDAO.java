package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.comment.Comment;

import java.util.List;

public interface CommentDAO {

    List<Comment> commentlist (String _id);

    void insertComment(Comment comment);

    String checkCommentPW (Comment comment);

    void updateComment(Comment comment);

    void deleteComment(Comment comment);
}
