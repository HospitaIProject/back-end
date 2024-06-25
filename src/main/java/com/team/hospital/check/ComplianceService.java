package com.team.hospital.check;

import com.team.hospital.check.dto.WriteCompliance;
import com.team.hospital.user.User;
import com.team.hospital.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ComplianceService {
    private final ComplianceRepository complianceRepository;
    private final UserService userService;

    @Transactional
    public void save(WriteCompliance write, Long patientId){
        User user = userService.findUserById(patientId);
        Compliance compliance = Compliance.buildComplain(write, user);
        complianceRepository.save(compliance);
    }
}
