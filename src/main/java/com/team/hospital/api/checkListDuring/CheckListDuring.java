package com.team.hospital.api.checkListDuring;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.CheckListFirst;
import com.team.hospital.api.checkListDuring.dto.WriteCheckListDuring;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CheckListDuring extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_during_id")
    private Long id;

    // 수술 중
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "maintain_temp")),
            @AttributeOverride(name = "remarks", column = @Column(name = "maintain_temp_remarks"))
    })
    private CheckListFirst maintainTemp; // 수술 중 환자 체온 유지 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "fluid_restriction")),
            @AttributeOverride(name = "remarks", column = @Column(name = "fluid_restriction_remarks"))
    })
    private CheckListFirst fluidRestriction; // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "anti_nausea")),
            @AttributeOverride(name = "remarks", column = @Column(name = "anti_nausea_remarks"))
    })
    private CheckListFirst antiNausea; // 수술 중 구역구토 방지제 사용 여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pain_control")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pain_control_remarks"))
    })
    private CheckListFirst painControl; // 수술 중 통증 조절을 위한 처치 여부

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id", nullable = false)
    private CheckListItem checkListItem;

    public static CheckListDuring toEntity(WriteCheckListDuring write, CheckListItem checkListItem) {
        return CheckListDuring.builder()

                // 수술 전
                .maintainTemp(CheckListFirst.of(write.getMaintainTemp(), write.getMaintainTemp_remarks()))
                .fluidRestriction(CheckListFirst.of(write.getFluidRestriction(), write.getFluidRestriction_remarks()))
                .antiNausea(CheckListFirst.of(write.getAntiNausea(), write.getAntiNausea_remarks()))
                .painControl(CheckListFirst.of(write.getPainControl(), write.getPainControl_remarks()))

                .checkListItem(checkListItem)
                .build();
    }

    public void updateCheckListDuring(WriteCheckListDuring write) {
        this.maintainTemp.update(write.getMaintainTemp(), write.getMaintainTemp_remarks());
        this.fluidRestriction.update(write.getFluidRestriction(), write.getFluidRestriction_remarks());
        this.antiNausea.update(write.getAntiNausea(), write.getAntiNausea_remarks());
        this.painControl.update(write.getPainControl(), write.getPainControl_remarks());
    }
}
