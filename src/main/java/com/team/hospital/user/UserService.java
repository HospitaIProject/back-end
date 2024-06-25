package com.team.hospital.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findUserById(Long userId){
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty())
            throw new IllegalArgumentException("회원 존재 x");
        return user.get();
    }

    @Transactional
    public void join(){
        User user = User.builder()
                .name("test")
                .build();

        userRepository.save(user);
    }
}
