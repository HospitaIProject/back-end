package com.team.hospital.api.checkListDuring.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.enumType.PainControlMethod;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListDuringDTO {

//    private Long patientId;                                     //환자 ID
//    private String patientName;                                 //환자 이름
//    private Long patientNumber;                                 //환자 번호
    private Long checkListDuringId;                             //checkListDuringId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // 수술 중
    private BooleanOption maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private BooleanOption fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private BooleanOption antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private BooleanOption painControl;                   // 수술 중 통증 조절을 위한 처치 여부
    private PainControlMethod painControlMethod;         // 수술 중 통증 조절 종류

    // 수술 중 비고
    private String maintainTemp_remarks;                  // 수술 중 환자 체온 유지 여부
    private String fluidRestriction_remarks;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private String antiNausea_remarks;                    // 수술 중 구역구토 방지제 사용 여부
    private String painControl_remarks;                   // 수술 중 통증 조절을 위한 처치 여부
    private String painControlMethod_remarks;

    public static CheckListDuringDTO toEntity(CheckListDuring checkListDuring) {
        CheckListDuringDTOBuilder checkListDuringDTO = CheckListDuringDTO.builder()
//                .patientId(checkListDuring.getCheckListItem().getOperation().getPatient().getId())
//                .patientName(checkListDuring.getCheckListItem().getOperation().getPatient().getName())
//                .patientNumber(checkListDuring.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListDuringId(checkListDuring.getId())
                .createAt(checkListDuring.getCreatedAt())
                .updatedAt(checkListDuring.getUpdatedAt());

        if (checkListDuring.getMaintainTemp() != null) {
            checkListDuringDTO.maintainTemp(checkListDuring.getMaintainTemp().getOption());
            checkListDuringDTO.maintainTemp_remarks(checkListDuring.getMaintainTemp().getRemarks());
        }
        if (checkListDuring.getFluidRestriction() != null) {
            checkListDuringDTO.fluidRestriction(checkListDuring.getFluidRestriction().getOption());
            checkListDuringDTO.fluidRestriction_remarks(checkListDuring.getFluidRestriction().getRemarks());
        }
        if (checkListDuring.getAntiNausea() != null) {
            checkListDuringDTO.antiNausea(checkListDuring.getAntiNausea().getOption());
            checkListDuringDTO.antiNausea_remarks(checkListDuring.getAntiNausea().getRemarks());
        }
        if (checkListDuring.getPainControl() != null) {
            checkListDuringDTO.painControl(checkListDuring.getPainControl().getOption());
            checkListDuringDTO.painControl_remarks(checkListDuring.getPainControl().getRemarks());
        }
        if (checkListDuring.getPainControlMethod() != null) {
            checkListDuringDTO.painControlMethod(checkListDuring.getPainControlMethod().getPainControlMethod());
            checkListDuringDTO.painControlMethod_remarks(checkListDuring.getPainControlMethod().getRemarks());
        }

        return checkListDuringDTO.build();
    }
}
