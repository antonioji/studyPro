package com.common.config;


import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class ServiceConfig {

	//@Value("${api.members.server}")
	private String apiServer = "test";

	//@Value("${api.members.keyName}")
	private String apiMembersKey = "test";

	//@Value("${api.members.keyValue}")
	private String apiMembersKeyVal= "test";
}
