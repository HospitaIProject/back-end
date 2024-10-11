package com.team.hospital.api.account;

import com.team.hospital.api.account.enumType.Role;
import com.team.hospital.api.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Account extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;

    private String adminID;
    private String adminPW;

    private Role role;

}
