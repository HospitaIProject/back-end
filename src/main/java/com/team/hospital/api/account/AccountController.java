package com.team.hospital.api.account;

import com.team.hospital.api.account.dto.CreateAccountRequest;
import com.team.hospital.api.apiResponse.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/api/account")
    @Operation(summary = "최초 계정 등록")
    public SuccessResponse<?> save(@RequestBody CreateAccountRequest request) {
        accountService.save(request);
        return SuccessResponse.createSuccess();
    }
}
