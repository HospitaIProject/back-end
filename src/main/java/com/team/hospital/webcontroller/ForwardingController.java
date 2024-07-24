package com.team.hospital.webcontroller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {

    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String redirect(HttpServletRequest request) {
        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/hc") || requestURI.startsWith("/env")) {
            return "forward:" + requestURI;
        }

        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}