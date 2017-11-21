package com.common.fo.security;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.web.filter.CompositeFilter;

@Configuration
@EnableOAuth2Client
public class OAuthConfig {
	private Logger log = LoggerFactory.getLogger(getClass());
	private final OAuth2ClientContext oauth2ClientContext;

	@Autowired
	private UserDetailsService userDetailsService;

    public OAuthConfig(OAuth2ClientContext oauth2ClientContext) {
        this.oauth2ClientContext = oauth2ClientContext;
    }

    @Bean
    public Filter ssoFilter() {

    	OAuth2RestTemplate oAuth2FaceBookRestTemplate = new OAuth2RestTemplate(faceBookClient(), oauth2ClientContext);
    	UserInfoTokenServices faceBookTokenServices = new UserInfoTokenServices(faceBookResource().getUserInfoUri(), faceBookClient().getClientId());

    	OAuth2ClientAuthenticationProcessingFilter facebookFilter 	= new OAuth2ClientAuthenticationProcessingFilter("/login/facebook");
    	facebookFilter.setRestTemplate(oAuth2FaceBookRestTemplate);
    	facebookFilter.setTokenServices(faceBookTokenServices);
    	facebookFilter.setAuthenticationSuccessHandler(new OAuthSuccessHandler("facebook", userDetailsService));

    	OAuth2RestTemplate oAuth2NaverRestTemplate = new OAuth2RestTemplate(naverClient(), oauth2ClientContext);
        UserInfoTokenServices naverTokenServices = new UserInfoTokenServices(naverResource().getUserInfoUri(), naverClient().getClientId());
        OAuth2ClientAuthenticationProcessingFilter naverFilter = new OAuth2ClientAuthenticationProcessingFilter("/login/naver");
        naverFilter.setRestTemplate(oAuth2NaverRestTemplate);
        naverFilter.setTokenServices(naverTokenServices);
        naverFilter.setAuthenticationSuccessHandler(new OAuthSuccessHandler("naver", userDetailsService));

        List<Filter> filters = new ArrayList<>();
        filters.add(facebookFilter);
        filters.add(naverFilter);

        CompositeFilter filter = new CompositeFilter();
		filter.setFilters(filters);
		return filter;
    }

    @Bean
    @ConfigurationProperties("naver.client")
    public OAuth2ProtectedResourceDetails naverClient() {
    	return new AuthorizationCodeResourceDetails();
    }

    @Bean
    @ConfigurationProperties("naver.resource")
    public ResourceServerProperties naverResource() {
    	return new ResourceServerProperties();
    }


    @Bean
    @ConfigurationProperties("facebook.client")
    public OAuth2ProtectedResourceDetails faceBookClient() {
        return new AuthorizationCodeResourceDetails();
    }

    @Bean
    @ConfigurationProperties("facebook.resource")
    public ResourceServerProperties faceBookResource() {
        return new ResourceServerProperties();
    }

    @Bean
    public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(filter);
        registration.setOrder(-100); // 스프링 사이트에 의하면 다른 필터보다 우선순위를 올리기위해 -100을 주었다고 나옵니다.
        return registration;
    }
}
