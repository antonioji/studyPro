package com.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@EnableRedisHttpSession
public class RedisConfig {
	@Value("${spring.redis.host}")
	private String redisHostName;

	@Value("${spring.redis.port}")
	private int redisPort;

	@Value("${spring.redis.timeout}")
	private int redisTimeout;


	/**
	 * propertySourcesPlaceholderConfigurer
	 *
	 * @return PropertySourcesPlaceholderConfigurer
	 * @since 2017-10-26
	 * @author redflaghk.ext@lotte.net
	 */
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	/**
	 * jedisConnectionFactory
	 *
	 * @return JedisConnectionFactory
	 * @since 2017-10-26
	 * @author redflaghk.ext@lotte.net
	 */
	@Bean
	JedisConnectionFactory jedisConnectionFactory() {
		JedisConnectionFactory factory = new JedisConnectionFactory();
		factory.setHostName(redisHostName);
		factory.setPort(redisPort);
		factory.setTimeout(redisTimeout);
		factory.setUsePool(true);
		factory.afterPropertiesSet();
		return factory;
	}

	/**
	 * redisTemplate
	 *
	 * @return RedisTemplate<?,?>
	 * @since 2017-10-26
	 * @author redflaghk.ext@lotte.net
	 */
	@Bean
	RedisTemplate<?, ?> redisTemplate() {
		RedisTemplate<?, ?> redisTemplate = new RedisTemplate<Object, Object>();
		redisTemplate.setConnectionFactory(jedisConnectionFactory());
		return redisTemplate;
	}


	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer serializer = new DefaultCookieSerializer();
		serializer.setCookieName("JSESSIONID");
		serializer.setCookiePath("/");
		serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
		return serializer;
	}

	//Redis를 ElastiCache로 사용시 설정이 필요하다
	@Bean
	public ConfigureRedisAction configureRedisAction() {
	    return ConfigureRedisAction.NO_OP;
	}

}


