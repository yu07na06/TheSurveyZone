package com.mongoosereum.dou_survey_zone.api.v1.domain.survey;

import lombok.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "survey")
@ApiModel("Survey MongoDB Document")
public class Survey_Mongo {
    @Id
    @ApiModelProperty(name="_id", value="MongoDB ObjectId, PK")
    private String _id;

    @ApiModelProperty(name="questionList", value="질문리스트")
    private List<Question> questionList;
}
