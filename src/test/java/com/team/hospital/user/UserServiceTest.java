package com.team.hospital.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTest {

    @Autowired UserService userService;

    @Test
    void save() {
        User user = new User("이름");
        userService.save(user);
        User byId = userService.findById(1L);
        System.out.println(byId.getName());
    }

}