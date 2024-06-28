package com.team.hospital.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "유저 서비스")
public class UserController {

    private final UserService userService;

    @GetMapping("/test")
    public User findById(@RequestParam Long id) {
        return userService.findById(id);
    }

}
