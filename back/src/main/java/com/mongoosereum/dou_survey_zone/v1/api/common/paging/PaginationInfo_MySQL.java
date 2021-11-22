package com.mongoosereum.dou_survey_zone.v1.api.common.paging;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PaginationInfo_MySQL {

    /** 페이징 계산에 필요한 파라미터들이 담긴 클래스 */
    private Criteria_MySQL criteria;

    /** 전체 데이터 개수 */
    private int totalRecordCount;

    /** 전체 페이지 개수 */
    private int totalPageCount;

    /** 페이지 리스트의 첫 페이지 번호 */
    private int firstPage;

    /** 페이지 리스트의 마지막 페이지 번호 */
    private int lastPage;

    /** SQL의 조건절에 사용되는 첫 RNUM */
    private int firstRecordIndex;

    /** SQL의 조건절에 사용되는 마지막 RNUM */
    private int lastRecordIndex;

    /** 이전 페이지 존재 여부 */
    private boolean hasPreviousPage;

    /** 다음 페이지 존재 여부 */
    private boolean hasNextPage;

    public PaginationInfo_MySQL(Criteria_MySQL criteria) {
        if (criteria.getPage_Num() < 1) {
            criteria.setPage_Num(1);
        }
        this.criteria = criteria;
    }

    public void setTotalRecordCount(int totalRecordCount) {
        this.totalRecordCount = totalRecordCount;

        if (totalRecordCount > 0) {
            calculation();
        }
    }

    private void calculation() {

        /* 전체 페이지 수 (현재 페이지 번호가 전체 페이지 수보다 크면 현재 페이지 번호에 전체 페이지 수를 저장) */
        totalPageCount = ((totalRecordCount - 1) / criteria.getRecords_Perpage()) + 1;
        if (criteria.getPage_Num() > totalPageCount) {
            criteria.setPage_Num(totalPageCount);
        }

        /* 페이지 리스트의 첫 페이지 번호 */
        firstPage = ((criteria.getPage_Num() - 1) / criteria.getPage_Size()) * criteria.getPage_Size() + 1;

        /* 페이지 리스트의 마지막 페이지 번호 (마지막 페이지가 전체 페이지 수보다 크면 마지막 페이지에 전체 페이지 수를 저장) */
        lastPage = firstPage + criteria.getPage_Size() - 1;
        if (lastPage > totalPageCount) {
            lastPage = totalPageCount;
        }

        /* SQL의 조건절에 사용되는 첫 RNUM */
        firstRecordIndex = (criteria.getPage_Num() - 1) * criteria.getRecords_Perpage();

        /* SQL의 조건절에 사용되는 마지막 RNUM */
        lastRecordIndex = criteria.getPage_Num() * criteria.getRecords_Perpage();

        /* 이전 페이지 존재 여부 */
        hasPreviousPage = firstPage != 1;

        /* 다음 페이지 존재 여부 */
        hasNextPage = (lastPage * criteria.getRecords_Perpage()) < totalRecordCount;
    }

}
