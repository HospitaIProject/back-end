package com.team.hospital.api.account;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByAdminID(String admin_ID);

    Boolean existsByAdminID(String admin_ID);
}
