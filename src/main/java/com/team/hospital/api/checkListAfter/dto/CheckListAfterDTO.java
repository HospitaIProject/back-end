package com.team.hospital.api.checkListAfter.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListAfterDTO {

    private Long patientId;                                     //환자 ID
    private String patientName;                                 //환자 이름
    private Long patientNumber;                                 //환자 번호
    private Long checkListAfterId;                             //checkListAfterId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // 수술 후
    private BooleanOption giStimulant;                   // 위장관 촉진 약 복용 여부
    private BooleanOption gumChewing;                    // 하루 3번 15분동안 껌씹기 여부
    private BooleanOption antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private BooleanOption ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private BooleanOption nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부

    private BooleanOption jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private LocalDate jpDrainRemovalDate;

    private BooleanOption catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private LocalDate catheterRemovalDate;
    private BooleanOption catheterReInsertion;

    private BooleanOption ivLineRemoval;                 // 수술 후 3일이내 IV line 제거 여부
    private LocalDate ivLineRemovalDate;

    // 수술 후
    private String giStimulant_remarks;                   // 위장관 촉진 약 복용 여부
    private String gumChewing_remarks;                    // 하루 3번 15분동안 껌씹기 여부
    private String antiNauseaPostOp_remarks;              // 수술 후 구역구토방지제 사용 여부
    private String ivFluidRestrictionPostOp_remarks;      // 수술 후 IV fluid 제한 여부
    private String nonOpioidPainControl_remarks;          // 수술 후 non-opioid pain control 여부
    private String jpDrainRemoval_remarks;                // 수술 후 3일이내 JP drain 제거 여부
    private String catheterRemoval_remarks;               // 수술 후 수술장에서 소변줄 제거 여부
    private String ivLineRemoval_remarks;                 // 수술 후 3일이내 IV line 제거 여부

    public static CheckListAfterDTO toEntity(CheckListAfter checkListAfter) {
        CheckListAfterDTOBuilder checkListAfterDTO = CheckListAfterDTO.builder()
                .patientId(checkListAfter.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkListAfter.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkListAfter.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListAfterId(checkListAfter.getId())
                .createAt(checkListAfter.getCreatedAt())
                .updatedAt(checkListAfter.getUpdatedAt());

        if (checkListAfter.getGiStimulant() != null) {
            checkListAfterDTO.giStimulant(checkListAfter.getGiStimulant().getOption());
            checkListAfterDTO.giStimulant_remarks(checkListAfter.getGiStimulant().getRemarks());
        }
        if (checkListAfter.getGumChewing() != null) {
            checkListAfterDTO.gumChewing(checkListAfter.getGumChewing().getOption());
            checkListAfterDTO.gumChewing_remarks(checkListAfter.getGumChewing().getRemarks());
        }
        if (checkListAfter.getAntiNauseaPostOp() != null) {
            checkListAfterDTO.antiNauseaPostOp(checkListAfter.getAntiNauseaPostOp().getOption());
            checkListAfterDTO.antiNauseaPostOp_remarks(checkListAfter.getAntiNauseaPostOp().getRemarks());
        }
        if (checkListAfter.getIvFluidRestrictionPostOp() != null) {
            checkListAfterDTO.ivFluidRestrictionPostOp(checkListAfter.getIvFluidRestrictionPostOp().getOption());
            checkListAfterDTO.ivFluidRestrictionPostOp_remarks(checkListAfter.getIvFluidRestrictionPostOp().getRemarks());
        }
        if (checkListAfter.getNonOpioidPainControl() != null) {
            checkListAfterDTO.nonOpioidPainControl(checkListAfter.getNonOpioidPainControl().getOption());
            checkListAfterDTO.nonOpioidPainControl_remarks(checkListAfter.getNonOpioidPainControl().getRemarks());
        }
        if (checkListAfter.getJpDrainRemoval() != null) {
            checkListAfterDTO.jpDrainRemoval(checkListAfter.getJpDrainRemoval().getOption());
            checkListAfterDTO.jpDrainRemovalDate(checkListAfter.getJpDrainRemoval().getRemovedDate());
            checkListAfterDTO.jpDrainRemoval_remarks(checkListAfter.getJpDrainRemoval().getRemarks());
        }
        if (checkListAfter.getCatheterRemoval() != null) {
            checkListAfterDTO.catheterRemoval(checkListAfter.getCatheterRemoval().getOption());
            checkListAfterDTO.catheterRemovalDate(checkListAfter.getCatheterRemoval().getRemovedDate());
            checkListAfterDTO.catheterReInsertion(checkListAfter.getCatheterRemoval().getFoleyCathReInsertion());
            checkListAfterDTO.catheterRemoval_remarks(checkListAfter.getCatheterRemoval().getRemarks());
        }
        if (checkListAfter.getIvLineRemoval() != null) {
            checkListAfterDTO.ivLineRemoval(checkListAfter.getIvLineRemoval().getOption());
            checkListAfterDTO.ivLineRemovalDate(checkListAfter.getIvLineRemoval().getRemovedDate());
            checkListAfterDTO.ivLineRemoval_remarks(checkListAfter.getIvLineRemoval().getRemarks());
        }

        return checkListAfterDTO.build();
    }
}
