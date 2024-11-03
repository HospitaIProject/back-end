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
public class CheckListSecond {

    @Enumerated(EnumType.STRING)
    private BooleanOption option;

    private String remarks;  // 비고

    private LocalDate removedDate;

    public static CheckListSecond of(BooleanOption option, String remarks, LocalDate removedDate){
        return CheckListSecond.builder()
                .option(option)
                .remarks(remarks)
                .removedDate(removedDate)
                .build();
    }

    public void update(BooleanOption option, String remarks, LocalDate removedDate){
        this.option = option;
        this.remarks = remarks;
        this.removedDate = removedDate;
    }
}
