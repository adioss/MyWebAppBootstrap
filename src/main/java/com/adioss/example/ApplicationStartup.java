package com.adioss.example;

import com.adioss.example.domain.Example;
import com.adioss.example.repository.ExampleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {
    @Inject
    private Environment env;
    @Inject
    private MongoDbFactory mongoDbFactory;

    @Inject
    private ExampleRepository exampleRepository;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        String[] activeProfiles = env.getActiveProfiles();
        if (activeProfiles.length > 0 && "dev".equals(activeProfiles[0])) {
            mongoDbFactory.getDb().dropDatabase();
            initAuthorities();
            //createAdminUser();
            createExample("test1");
            createExample("test2");
            testRepository();
        }
    }

    private void createExample(String name) {
        Example example = new Example();
        example.setName(name);
        example.setUrl("https://www.google.fr/search?q=test&oq=test");
        exampleRepository.save(example);
    }

    private void testRepository() {
        List<Example> all = exampleRepository.findAll();
    }

    //private User createUser() {
    //    User userInformation = userService.createUserInformation("user", "user", "user", "user", "user@bimbingo.com", "en");
    //    userInformation.setActivated(true);
    //    return userRepository.save(userInformation);
    //}
    //
    //private User createAdminUser() {
    //    User userInformation = userService.createUserInformation("admin", "admin", "admin", "admin", "admin@bimbingo.com", "en");
    //    userInformation.setActivated(true);
    //    userInformation.getAuthorities().add(authorityRepository.findOne(ADMIN));
    //    return userRepository.save(userInformation);
    //}
    //
    private void initAuthorities() {
        //    initAuthority(AuthoritiesConstants.ADMIN);
        //    initAuthority(AuthoritiesConstants.USER);
    }

    //
    private void initAuthority(String authority) {
        //    Authority authorityAdmin = new Authority();
        //    authorityAdmin.setName(authority);
        //    authorityRepository.save(authorityAdmin);
    }
}
