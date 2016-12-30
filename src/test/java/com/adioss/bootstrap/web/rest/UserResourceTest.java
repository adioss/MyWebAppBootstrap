package com.adioss.bootstrap.web.rest;

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
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.adioss.bootstrap.domain.Language.ENGLISH;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SuppressWarnings("SpringJavaAutowiredMembersInspection")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class UserResourceTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private UserRepository userRepository;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        userRepository.deleteAll();
    }

    @Test
    public void shouldCreateUser() throws Exception {
        // Given
        User user = getFirstUser();
        String content = new ObjectMapper().writeValueAsString(user);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/console/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<User> users = getSavedUsers();
        Assert.assertEquals(1, users.size());
        Assert.assertEquals(user.getUsername(), users.get(0).getUsername());
    }

    @Test
    public void shouldUpdateUser() throws Exception {
        // Given
        User user = userRepository.save(getFirstUser());
        user.setUsername("nameChanged");
        user.setEmail("test@mail.com");
        String content = new ObjectMapper().writeValueAsString(user);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.put("/api/console/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<User> users = getSavedUsers();
        Assert.assertEquals(1, users.size());
        Assert.assertEquals(getFirstUser().getUsername(), users.get(0).getUsername());
        Assert.assertEquals(user.getEmail(), users.get(0).getEmail());
    }

    @Test
    public void shouldRemoveUser() throws Exception {
        // Given
        User user = userRepository.save(getFirstUser());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/console/users/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        Assert.assertEquals(0, getSavedUsers().size());
    }

    @Test
    public void shouldRetrieveUser() throws Exception {
        // Given
        User user = userRepository.save(getFirstUser());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.get("/api/console/users/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        List<User> users = getSavedUsers();
        Assert.assertEquals(1, users.size());
        Assert.assertEquals(user.getUsername(), users.get(0).getUsername());
        Assert.assertEquals(user.getEmail(), users.get(0).getEmail());
    }

    @Test
    public void shouldListUser() throws Exception {
        // Given
        userRepository.save(userListTest());
        List<User> users = getSavedUsers();

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.get("/api/console/users")
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE));

        // Then
        perform.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("content", hasSize(4)))
                .andExpect(jsonPath("content[0].id", is(users.get(0).getId().intValue())))
                .andExpect(jsonPath("content[0].username", is(users.get(0).getUsername())))
                .andExpect(jsonPath("content[3].id", is(users.get(3).getId().intValue())))
                .andExpect(jsonPath("content[3].username", is(users.get(3).getUsername())))
                .andExpect(jsonPath("sort[0].direction", is("ASC")))
                .andExpect(jsonPath("sort[0].property", is("username")))
                .andExpect(jsonPath("sort[0].ascending", is(true)))
                .andExpect(jsonPath("first", is(true)))
                .andExpect(jsonPath("numberOfElements", is(4)))
                .andExpect(jsonPath("number", is(0)))
                .andExpect(jsonPath("size", is(10)));
    }

    @Test
    public void shouldChangePassword() throws Exception {
        // Given
        User user = userRepository.save(getFirstUser());
        String content = new ObjectMapper().writeValueAsString(new UserPasswordDTO("pass", "pass"));

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.post("/api/console/users/changePassword/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content));

        // Then
        perform.andExpect(status().isOk());
    }

    @Test
    public void shouldRejectPasswordModificationIfNotValidated() throws Exception {
        // Given
        User user = userRepository.save(getFirstUser());
        String content = new ObjectMapper().writeValueAsString(new UserPasswordDTO("pass", "noequals"));

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.post("/api/console/users/changePassword/" + user.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(content));

        // Then
        perform.andExpect(status().isBadRequest());
    }

    private Collection<User> userListTest() {

        List<User> result = new ArrayList<>();
        result.add(new User("test1", "test@mail.com", "test", ENGLISH, null));
        result.add(new User("test2", "test@mail.com", "test", ENGLISH, null));
        result.add(new User("test3", "test@mail.com", "test", ENGLISH, null));
        result.add(getFirstUser());
        return result;
    }

    private User getFirstUser() {
        return new User("aaaaaa", "test@mail.com", "test", ENGLISH, null);
    }

    private List<User> getSavedUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .sorted(Comparator.comparing(User::getUsername))
                .collect(Collectors.toList());
    }

}