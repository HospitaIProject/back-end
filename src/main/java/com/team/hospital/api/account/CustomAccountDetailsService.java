package com.team.hospital.api.account;

import com.team.hospital.api.account.dto.CustomAccountDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomAccountDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    // username 에서 email 로 찾게 변경
    @Override
    public CustomAccountDetails loadUserByUsername(String adminID) {
        Account account = accountRepository.findAccountByAdminID(adminID);

        if (account == null)
            //이 부분 공통 예외는 LoginFilter 에서 됨
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");

        return new CustomAccountDetails(account);
    }
}
