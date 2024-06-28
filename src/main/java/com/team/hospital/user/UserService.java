package com.team.hospital.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    public User findById(Long id) {
        Optional<User> byId = userRepository.findById(id);
        if (byId.isEmpty()) throw new NoSuchElementException("해당 환자 번호는 존재하지 않습니다.");
        return byId.get();
    }

}
