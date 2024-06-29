package com.team.hospital.webcontroller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class WebController {

    @GetMapping("/compliance")
    public String compliance() {
        return "compliance/writeCompliance";
    }

}
