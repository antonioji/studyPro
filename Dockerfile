FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/study-*.jar /study.jar
EXPOSE 8080
CMD ["java", "-Dspring.profiles.active=local", "-jar", "/study.jar"]
