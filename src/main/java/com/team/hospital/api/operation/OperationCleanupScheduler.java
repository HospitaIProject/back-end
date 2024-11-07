package com.team.hospital.api.operation;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OperationCleanupScheduler {

    private final OperationService operationService;

    // 매일 자정에 삭제 대기 전환 및 완전 삭제를 처리
    @Scheduled(cron = "0 0 0 * * *")
    public void runCleanupTasks() {
        operationService.markForDeletion();      // 삭제 대기 상태로 전환
        operationService.deletePermanently();    // 완전 삭제
    }
}
