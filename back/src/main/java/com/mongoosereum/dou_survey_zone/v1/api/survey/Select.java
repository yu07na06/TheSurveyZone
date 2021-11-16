package com.mongoosereum.dou_survey_zone.v1.api.survey;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Getter
@Setter
@Document(collection="select")
public class Select {
    @Id
    private String SurSel_ID;
    private String SurSel_Content;
    private Long SurSel_Order;

    @Builder
    public Select(String SurSel_Content, Long SurSel_Order) {
        this.SurSel_ID = new ObjectId().toString();
        this.SurSel_Content = SurSel_Content;
        this.SurSel_Order = SurSel_Order;
    }
}
