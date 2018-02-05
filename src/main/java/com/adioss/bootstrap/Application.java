package com.adioss.bootstrap;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import com.adioss.bootstrap.domain.Enterprise;
import com.adioss.bootstrap.domain.Person;
import com.adioss.bootstrap.domain.Role;
import com.adioss.bootstrap.repository.EnterpriseRepository;
import com.adioss.bootstrap.repository.PersonRepository;
import com.adioss.bootstrap.service.UserService;
import com.adioss.bootstrap.web.dto.UserDTO;

import static com.adioss.bootstrap.domain.Language.ENGLISH;
import static java.util.Arrays.*;
import static java.util.Collections.*;

@SpringBootApplication
public class Application {
    public static final String DEV_PROFILE = "dev";
    private static final String CD_PROFILE = "cd";
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    private final Environment environment;

    @Autowired
    public Application(Environment environment) {
        this.environment = environment;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
        sessionLocaleResolver.setDefaultLocale(Locale.US);
        return sessionLocaleResolver;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
        localeChangeInterceptor.setParamName("lang");
        return localeChangeInterceptor;
    }

    @Bean
    public CommandLineRunner bootstrap(EnterpriseRepository enterpriseRepository, PersonRepository personRepository, UserService userService) {
        return (args) -> {
            log.info("Start done.");

            List<String> activeProfiles = asList(environment.getActiveProfiles());
            if (activeProfiles.contains(DEV_PROFILE) || activeProfiles.contains(CD_PROFILE)) {
                for (int i = 0; i < 100; i++) {
                    Enterprise enterprise = new Enterprise("testEnterprise" + i, "http://testEnterprise.com");
                    enterpriseRepository.save(enterprise);
                    Person person = new Person("testPerson" + i, "http://testEnterprise.com", enterprise);
                    personRepository.save(person);
                }
                userService.create(new UserDTO("test", "test@test.com", "test", ENGLISH, singletonList(Role.USER)));
                userService.create(new UserDTO("admin", "admin@test.com", "admin", ENGLISH, asList(Role.ADMIN, Role.USER)));
            }

            log.info("Init done.");
        };
    }
}
