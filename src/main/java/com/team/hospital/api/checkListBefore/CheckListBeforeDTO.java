package com.team.hospital.api.checkListBefore;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListBeforeDTO {

    private Long patientId;                                     //환자 ID
    private String patientName;                                 //환자 이름
    private Long patientNumber;                                 //환자 번호
    private Long checkListBeforeId;                             //checkListBeforeId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // 수술 전
    private BooleanOption explainedPreOp;                // EAS 수술전 설명
    private BooleanOption onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private BooleanOption onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private BooleanOption dvtPrevention;                 // DVT 예방
    private BooleanOption antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private BooleanOption painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 전
    private String explainedPreOp_remarks;                // EAS 수술전 설명
    private String onsPreOp2hr_remarks;                   // 수술 2시간 전 ONS 복용여부
    private String onsPostBowelPrep_remarks;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private String dvtPrevention_remarks;                 // DVT 예방
    private String antibioticPreIncision_remarks;         // 피부 절개 60분전 예방적 항생제 투여
    private String painMedPreOp_remarks;                  // 수술전 통증 조절약 복용 여부

    public static CheckListBeforeDTO toEntity(CheckListBefore checkListBefore) {
        CheckListBeforeDTOBuilder checkListBeforeDTO = CheckListBeforeDTO.builder()
                .patientId(checkListBefore.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkListBefore.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkListBefore.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListBeforeId(checkListBefore.getId())
                .createAt(checkListBefore.getCreatedAt())
                .updatedAt(checkListBefore.getUpdatedAt());

        if (checkListBefore.getExplainedPreOp() != null) {
            checkListBeforeDTO.explainedPreOp(checkListBefore.getExplainedPreOp().getOption());
            checkListBeforeDTO.explainedPreOp_remarks(checkListBefore.getExplainedPreOp().getRemarks());
        }
        if (checkListBefore.getOnsPreOp2hr() != null) {
            checkListBeforeDTO.onsPreOp2hr(checkListBefore.getOnsPreOp2hr().getOption());
            checkListBeforeDTO.onsPreOp2hr_remarks(checkListBefore.getOnsPreOp2hr().getRemarks());
        }
        if (checkListBefore.getOnsPostBowelPrep() != null) {
            checkListBeforeDTO.onsPostBowelPrep(checkListBefore.getOnsPostBowelPrep().getOption());
            checkListBeforeDTO.onsPostBowelPrep_remarks(checkListBefore.getOnsPostBowelPrep().getRemarks());
        }
        if (checkListBefore.getDvtPrevention() != null) {
            checkListBeforeDTO.dvtPrevention(checkListBefore.getDvtPrevention().getOption());
            checkListBeforeDTO.dvtPrevention_remarks(checkListBefore.getDvtPrevention().getRemarks());
        }
        if (checkListBefore.getAntibioticPreIncision() != null) {
            checkListBeforeDTO.antibioticPreIncision(checkListBefore.getAntibioticPreIncision().getOption());
            checkListBeforeDTO.antibioticPreIncision_remarks(checkListBefore.getAntibioticPreIncision().getRemarks());
        }
        if (checkListBefore.getPainMedPreOp() != null) {
            checkListBeforeDTO.painMedPreOp(checkListBefore.getPainMedPreOp().getOption());
            checkListBeforeDTO.painMedPreOp_remarks(checkListBefore.getPainMedPreOp().getRemarks());
        }

        return checkListBeforeDTO.build();
    }
}
