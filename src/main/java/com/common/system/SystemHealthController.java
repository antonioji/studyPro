package com.common.system;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SystemHealthController {
	
	
	@RequestMapping("/sys/healthCheck")
	public String healthCheck(){
		return "Hello System";
	}

}
