package com.team.hospital.api.checkListDuring.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListDuring.enumType.PainControlMethod;
import lombok.Getter;

@Getter
public class WriteCheckListDuring {

    // 수술 중
    private BooleanOption maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private BooleanOption fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private BooleanOption antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private BooleanOption painControl;                   // 수술 중 통증 조절을 위한 처치 여부
    private PainControlMethod painControlMethod;         // 수술 중 통증 조절 종류

    // 수술 중
    private String maintainTemp_remarks;                  // 수술 중 환자 체온 유지 여부
    private String fluidRestriction_remarks;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private String antiNausea_remarks;                    // 수술 중 구역구토 방지제 사용 여부
    private String painControl_remarks;                   // 수술 중 통증 조절을 위한 처치 여부
    private String painControlMethod_remarks;             // 수술 중 통증 조절 종류
}
