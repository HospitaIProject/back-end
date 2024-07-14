package com.team.hospital.api.checkList.enumType;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckListThird {

    @Enumerated(EnumType.STRING)
    private BooleanOption option;

    private String remarks;  // 비고

    private LocalDate removedDate;

    @Enumerated(EnumType.STRING)
    private BooleanOption foleyCathReInsertion;

    public static CheckListThird buildComplianceDetail(BooleanOption option, String remarks, LocalDate removedDate, BooleanOption foleyCathReInsertion) {
        return CheckListThird.builder()
                .option(option)
                .remarks(remarks)
                .removedDate(removedDate)
                .foleyCathReInsertion(foleyCathReInsertion)
                .build();
    }

    public void update(BooleanOption option, String remarks, LocalDate removedDate, BooleanOption foleyCathReInsertion) {
        this.option = option;
        this.remarks = remarks;
        this.removedDate = removedDate;
        this.foleyCathReInsertion = foleyCathReInsertion;
    }
}
