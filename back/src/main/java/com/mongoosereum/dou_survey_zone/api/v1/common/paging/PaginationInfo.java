package com.mongoosereum.dou_survey_zone.api.v1.common.paging;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@ApiModel("페이징 관련 정보")
public class PaginationInfo {

    /** 페이징 계산에 필요한 파라미터들이 담긴 클래스 */
    @ApiModelProperty(name = "criteria", notes="페이징 계산에 필요한 정보")
    private PageCriteria criteria;

    @ApiModelProperty(name = "totalRecordCount", notes="전체 데이터 수")
    private int totalRecordCount;

    @ApiModelProperty(name = "totalPageCount", notes="전체 페이지 수")
    private int totalPageCount;

    @ApiModelProperty(name = "firstPage", notes="첫 페이지 번호")
    private int firstPage;

    @ApiModelProperty(name = "lastPage", notes="마지막 페이지 번호")
    private int lastPage;

    /** SQL의 조건절에 사용되는 첫 RNUM */
    private int firstRecordIndex;

    /** SQL의 조건절에 사용되는 마지막 RNUM */
    private int lastRecordIndex;

    /** 이전 페이지 존재 여부 */
    private boolean hasPreviousPage;

    /** 다음 페이지 존재 여부 */
    private boolean hasNextPage;

    public PaginationInfo(PageCriteria criteria) {
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
