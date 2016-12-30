package com.adioss.bootstrap.web.rest;

import com.adioss.bootstrap.domain.Language;
import com.adioss.bootstrap.domain.Role;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.UserRepository;
import com.adioss.bootstrap.web.dto.UserPasswordDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;

import static java.util.Collections.singletonList;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("SpringJavaAutowiredMembersInspection")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class ProfileResourceTest {
    private static final String BASIC_USER_USERNAME = "test";
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private UserRepository userRepository;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
        userRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = BASIC_USER_USERNAME)
    public void shouldUpdateUserProfile() throws Exception {
        // Given
        User savedUser = userRepository.save(getUser());
        String expectedEmail = "new@email.com";
        savedUser.setEmail(expectedEmail);
        savedUser.setRoles(Arrays.asList(Role.USER, Role.ADMIN));
        String content = new ObjectMapper().writeValueAsString(savedUser);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.put("/api/profile")
                .contentType(MediaType.APPLICATION_JSON_VALUE).with(csrf())
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        User updatedUser = userRepository.findOne(savedUser.getId());
        Assert.assertEquals(getUser().getRoles(), updatedUser.getRoles());
        Assert.assertEquals(expectedEmail, updatedUser.getEmail());
    }

    @Test
    @WithMockUser(username = "Other")
    public void shouldRejectUpdateUserProfileIfNotPrincipal() throws Exception {
        // Given
        User savedUser = userRepository.save(getUser());
        String content = new ObjectMapper().writeValueAsString(savedUser);

        // When
        try {
            this.mockMvc.perform(MockMvcRequestBuilders.put("/api/profile")
                    .contentType(MediaType.APPLICATION_JSON_VALUE).with(csrf())
                    .content(content));
        } catch (Exception e) {
            // Then
            Assert.assertTrue(true);
            return;
        }
        //noinspection ConstantConditions
        Assert.assertTrue(false);
    }

    @Test
    @WithMockUser(username = BASIC_USER_USERNAME)
    public void shouldChangePassword() throws Exception {
        // Given
        userRepository.save(getUser());
        String content = new ObjectMapper().writeValueAsString(new UserPasswordDTO("pass", "pass"));

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.post("/api/profile/changePassword")
                        .contentType(MediaType.APPLICATION_JSON_VALUE).with(csrf())
                        .content(content));

        // Then
        perform.andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "Other")
    public void shouldRejectPasswordModificationIfNotPrincipal() throws Exception {
        // Given
        userRepository.save(getUser());
        String content = new ObjectMapper().writeValueAsString(new UserPasswordDTO("pass", "pass"));

        // When
        try {
            this.mockMvc.perform(MockMvcRequestBuilders.post("/api/profile/changePassword")
                    .contentType(MediaType.APPLICATION_JSON_VALUE).with(csrf())
                    .content(content));
        } catch (Exception e) {
            // Then
            Assert.assertTrue(true);
            return;
        }
        //noinspection ConstantConditions
        Assert.assertTrue(false);
    }

    @Test
    @WithMockUser(username = BASIC_USER_USERNAME)
    public void shouldRejectPasswordModificationIfNotValidated() throws Exception {
        // Given
        userRepository.save(getUser());
        String content = new ObjectMapper().writeValueAsString(new UserPasswordDTO("pass", "noequals"));

        try {
            this.mockMvc.perform(MockMvcRequestBuilders.post("/api/profile/changePassword")
                    .contentType(MediaType.APPLICATION_JSON_VALUE).with(csrf())
                    .content(content));
        } catch (Exception e) {
            // Then
            Assert.assertTrue(true);
            return;
        }
        //noinspection ConstantConditions
        Assert.assertTrue(false);
    }

    public User getUser() {
        return new User(BASIC_USER_USERNAME, "test@mail.com", "test", Language.ENGLISH, singletonList(Role.USER));
    }
}