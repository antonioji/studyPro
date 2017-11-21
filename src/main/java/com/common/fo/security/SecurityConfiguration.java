package com.common.fo.security;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.common.fo.security.sso.CustomerAuthenticationprovider;
import com.common.fo.service.LoginService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


	@Autowired
	private LoginService loginService;

	private final String REMEMBER_ME_KEY = "B2_MEMBERS_REMEMBER_KEY";
	private final String MEMBER_REMEMBER_ME_COOKIE = "B2_REMEMBER";
	private final Filter ssoFilter;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.addFilterBefore(ssoFilter, BasicAuthenticationFilter.class);
		http
			.headers().frameOptions().disable()
				.and()
			.authorizeRequests()
				.antMatchers("/css/**", "/js/**", "/images/**").permitAll()
				.antMatchers("/login/**").anonymous()
				.antMatchers("/regist/**").anonymous()
				.antMatchers("/" ,"/index", "/sys/healthCheck" ).permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login/form")
				.usernameParameter("mbrLoginId")
				.passwordParameter("mbrLoginPwd")
				.successHandler(loginSuccessHandler())
				.failureHandler(loginFailureHandler())
			    .and()
			.logout()
				.deleteCookies("JSESSIONID")
				.logoutUrl("/logout")
				.logoutSuccessUrl("/login/form")
				.and()
			.rememberMe()
				.key(REMEMBER_ME_KEY)
				.rememberMeParameter("rememberMe")
				.rememberMeServices(rememberMeServices())
				.and()
			.sessionManagement()
		        .sessionCreationPolicy(SessionCreationPolicy.NEVER)
		        .and()
			.exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPoint())
				.and()
			.exceptionHandling()
				.accessDeniedHandler(new MemberAccessDeniedHandler());
	}

	public SecurityConfiguration(Filter ssoFilter) {
        this.ssoFilter = ssoFilter;
    }

	@Override
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers("/*.css");
		web.ignoring().antMatchers("/*.js");
	}

	@Bean
    public RememberMeServices rememberMeServices() {
        TokenBasedRememberMeServices rememberMeServices = new TokenBasedRememberMeServices(REMEMBER_ME_KEY, loginService);
        rememberMeServices.setAlwaysRemember(true);
        rememberMeServices.setTokenValiditySeconds(60 * 60 * 24);
        rememberMeServices.setCookieName(MEMBER_REMEMBER_ME_COOKIE);
        return rememberMeServices;
    }

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.authenticationProvider(authenticationProvider());
    }

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		CustomerAuthenticationprovider authenticationProvider = new CustomerAuthenticationprovider();
		authenticationProvider.setPasswordEncoder(passwordEncoder());
        authenticationProvider.setUserDetailsService(loginService);
        authenticationProvider.setHideUserNotFoundExceptions(Boolean.FALSE);

        return authenticationProvider;
	}

	@Bean
	public AuthenticationFailureHandler loginFailureHandler() {
		return new LoginFailureHandler();
	}
	@Bean
	public AuthenticationSuccessHandler loginSuccessHandler() {
		return new LoginSuccessHandler();
	}

	@Bean
    public AuthenticationEntryPoint authenticationEntryPoint(){
        return new MembersEntryPoint();
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
