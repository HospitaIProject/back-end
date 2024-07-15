package com.team.hospital.api.account;

import com.team.hospital.api.account.dto.CreateAccountRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public void save(CreateAccountRequest request){
        Account account = Account.createAccount(request);
        accountRepository.save(account);
    }
}
