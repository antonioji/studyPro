package com.common.config;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContainerConfig {
	
	@Value("${tomcat.ajp.protocol}")
	String ajpProtocol;
	 
	@Value("${tomcat.ajp.port}")
	int ajpPort;
	
	@Bean
    public EmbeddedServletContainerCustomizer containerCustomizer() {
        return container -> {
            TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;

            
            Connector ajpConnector = new Connector(ajpProtocol);      
            ajpConnector.setProtocol(ajpProtocol);
            ajpConnector.setPort(ajpPort);
            ajpConnector.setSecure(false);
            ajpConnector.setAllowTrace(false);
            ajpConnector.setScheme("http");
            tomcat.addAdditionalTomcatConnectors(ajpConnector);
        };
    }

}
