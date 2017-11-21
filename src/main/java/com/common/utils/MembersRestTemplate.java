package com.common.utils;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import com.common.config.ServiceConfig;

@Component
public class MembersRestTemplate {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private ServiceConfig config;

	/**
	 * getHeaderWithApikey
	 * Api 호출시 header api key 셋팅 후 리턴 header
	 *
	 * @return
	 * @return HttpHeaders
	 * @since 2017-10-30
	 * @author junil
	 */
	public HttpHeaders getHeaderWithApikey() {
		HttpHeaders headers = ApiClientUtil.getHeaders();
		headers.set(config.getApiMembersKey(), config.getApiMembersKeyVal());
		return headers;
	}
	/**
	 * getRestTemplate
	 * service에서 API 서버 호출시 사용
	 *
	 * @return
	 * @return RestTemplate
	 * @since 2017-10-30
	 * @author junil
	 */
	public RestTemplate getRestTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
			@Override
			public void handleError(ClientHttpResponse response) throws IOException {
				 log.error("handleError code :" + response.getStatusText());
			}
		});

		return restTemplate;
	}

}
