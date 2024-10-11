package com.team.hospital.api.account;

import com.team.hospital.api.account.dto.CreateAccountRequest;
import com.team.hospital.api.account.enumType.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void save(CreateAccountRequest request) {
        if (accountRepository.existsByAdminID(request.getAdminID()))
            throw new IllegalArgumentException("이미 존재");

        Account account = Account.builder()
                .adminID(request.getAdminID())
                .adminPW(passwordEncoder.encode(request.getAdminPW()))
                .role(Role.ROLE_ADMIN)
                .build();

        accountRepository.save(account);
    }
}
