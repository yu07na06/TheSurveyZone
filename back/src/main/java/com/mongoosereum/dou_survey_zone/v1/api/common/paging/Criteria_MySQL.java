package com.mongoosereum.dou_survey_zone.v1.api.common.paging;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class Criteria_MySQL {


        /** 생성자 **/
        public Criteria_MySQL() {
        this.page_Size=5;
        this.records_Perpage =12;
        }

        /** 현재 페이지 번호 */
        private Integer page_Num;

        /** 페이지당 출력할 데이터 개수 */
        private int records_Perpage;

        /** 화면 하단에 출력할 페이지 사이즈 */
        private int page_Size;

        /** 검색 키워드 */
        private String search_Key;

        /** 태그 키워드 */
        private Integer search_Tag;

        private String user_Email;

        /** 시작 페이지 **/
        public int getStart_Page() {
            return (page_Num - 1) * records_Perpage;
        }

    }
