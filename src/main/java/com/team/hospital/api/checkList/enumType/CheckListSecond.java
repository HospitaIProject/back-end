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

    public static CheckListSecond of(BooleanOption option, String remarks){
        return CheckListSecond.builder()
                .option(option)
                .remarks(remarks)
                .build();
    }

    public void update(LocalDate removedDate){
        this.removedDate = removedDate;
    }

    public void update(BooleanOption option){
        this.option = option;
    }

    public void update(String remarks){
        this.remarks = remarks;
    }

    public void update(BooleanOption option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
