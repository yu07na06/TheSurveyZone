package com.mongoosereum.dou_survey_zone.v1.api.survey;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Question {
    @Id
    private String SurQue_ID;
    private String SurQue_Content;
    private QType SurQue_QType;
    private Long SurQue_MaxAns;
    private Long SurQue_Order;
    private List<Select> selectList;

    @Builder
    public Question(String SurQue_Content, QType SurQue_QType, Long SurQue_MaxAns, Long SurQue_Order,List<Select>selectList) {
        this.SurQue_ID = new ObjectId().toString();
        this.SurQue_Content = SurQue_Content;
        this.SurQue_QType = SurQue_QType;
        this.SurQue_MaxAns = SurQue_MaxAns;
        this.SurQue_Order = SurQue_Order;
        this.selectList = selectList;
    }
}