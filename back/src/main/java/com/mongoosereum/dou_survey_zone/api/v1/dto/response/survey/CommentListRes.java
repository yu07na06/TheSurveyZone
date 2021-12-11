package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.comment.Comment;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentListRes {

    @ApiModelProperty(name = "paginationInfo", notes = "해당 페이지에 대한 정보")
    private PaginationInfo paginationInfo;

    @ApiModelProperty(name = "commentlist", notes = "해당 설문조사에 대한 댓글 리스트")
    List<Comment> Commentlist;
}
