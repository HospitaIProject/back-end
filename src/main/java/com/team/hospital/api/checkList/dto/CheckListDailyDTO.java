package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

import static com.team.hospital.api.checkList.enumType.BooleanOption.YES;

@Builder
@Getter
public class CheckListDailyDTO {
    @Builder.Default
    private boolean giStimulant = false;
    @Builder.Default
    private boolean gumChewing = false;
    @Builder.Default
    private boolean ivFluidRestriction = false;
    @Builder.Default
    private boolean nonOpioidPainControl = false;
//    @Builder.Default
//    private boolean jpDrainRemoval = false;
    @Builder.Default
    private boolean ivLineRemoval = false;

    public static CheckListDailyDTO createCheckListDailyDTO(List<CheckList> checkLists) {
        CheckListDailyDTO.CheckListDailyDTOBuilder builder = CheckListDailyDTO.builder();
        for (CheckList checkList : checkLists) {
            if (checkList.getPodOneGiStimulant().getOption() == YES || checkList.getPodTwoGiStimulant().getOption() == YES || checkList.getPodThreeGiStimulant().getOption() == YES) {
                builder.giStimulant(true);
            }
            if (checkList.getPodOneGumChewing().getOption() == YES || checkList.getPodTwoGumChewing().getOption() == YES || checkList.getPodThreeGumChewing().getOption() == YES) {
                builder.gumChewing(true);
            }
            if (checkList.getPodOneIvFluidRestriction().getOption() == YES || checkList.getPodTwoIvFluidRestriction().getOption() == YES || checkList.getPodThreeIvFluidRestriction().getOption() == YES) {
                builder.ivFluidRestriction(true);
            }
            if (checkList.getPodOneNonOpioidPainControl().getOption() == YES || checkList.getPodTwoNonOpioidPainControl().getOption() == YES || checkList.getPodThreeNonOpioidPainControl().getOption() == YES) {
                builder.nonOpioidPainControl(true);
            }
//            if (checkList.getPodOneJpDrainRemoval().getOption() == YES || checkList.getPodTwoJpDrainRemoval().getOption() == YES || checkList.getPodThreeJpDrainRemoval().getOption() == YES) {
//                builder.jpDrainRemoval(true);
//            }
            if (checkList.getPodThreeIvLineRemoval().getOption() == YES) {
                builder.ivLineRemoval(true);
            }
        }
        return builder.build();
    }
}
