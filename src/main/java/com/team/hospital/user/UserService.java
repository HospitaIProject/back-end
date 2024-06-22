package com.team.hospital.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void join(){
        User user = User.builder()
                .name("test")
                .build();

        userRepository.save(user);
    }
}
