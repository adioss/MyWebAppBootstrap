package com.adioss.bootstrap.web.rest;

import com.adioss.bootstrap.domain.Person;
import com.adioss.bootstrap.repository.PersonRepository;
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

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SuppressWarnings("SpringJavaAutowiredMembersInspection")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class PersonResourceTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private PersonRepository personRepository;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        personRepository.deleteAll();
    }

    @Test
    public void shouldCreatePerson() throws Exception {
        // Given
        Person person = getFirstPerson();
        String content = new ObjectMapper().writeValueAsString(person);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/persons")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<Person> persons = getSavedPersons();
        Assert.assertEquals(1, persons.size());
        Assert.assertEquals(person.getName(), persons.get(0).getName());
    }

    @Test
    public void shouldUpdatePerson() throws Exception {
        // Given
        Person person = personRepository.save(getFirstPerson());
        person.setName("nameChanged");
        person.setUrl("http://www.urlchanged.com");
        String content = new ObjectMapper().writeValueAsString(person);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.put("/api/persons")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<Person> persons = getSavedPersons();
        Assert.assertEquals(1, persons.size());
        Assert.assertEquals(person.getName(), persons.get(0).getName());
        Assert.assertEquals(person.getUrl(), persons.get(0).getUrl());
    }

    @Test
    public void shouldRemovePerson() throws Exception {
        // Given
        Person person = personRepository.save(getFirstPerson());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/persons/" + person.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        Assert.assertEquals(0, getSavedPersons().size());
    }

    @Test
    public void shouldRetrievePerson() throws Exception {
        // Given
        Person person = personRepository.save(getFirstPerson());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.get("/api/persons/" + person.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        List<Person> persons = getSavedPersons();
        Assert.assertEquals(1, persons.size());
        Assert.assertEquals(person.getName(), persons.get(0).getName());
        Assert.assertEquals(person.getUrl(), persons.get(0).getUrl());
    }

    @Test
    public void shouldListPerson() throws Exception {
        // Given
        personRepository.save(personListTest());
        List<Person> persons = getSavedPersons();

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.get("/api/persons")
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE));

        // Then
        perform.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("content", hasSize(4)))
                .andExpect(jsonPath("content[0].id", is(persons.get(0).getId().intValue())))
                .andExpect(jsonPath("content[0].name", is(persons.get(0).getName())))
                .andExpect(jsonPath("content[3].id", is(persons.get(3).getId().intValue())))
                .andExpect(jsonPath("content[3].name", is(persons.get(3).getName())))
                .andExpect(jsonPath("sort[0].direction", is("ASC")))
                .andExpect(jsonPath("sort[0].property", is("name")))
                .andExpect(jsonPath("sort[0].ascending", is(true)))
                .andExpect(jsonPath("first", is(true)))
                .andExpect(jsonPath("numberOfElements", is(4)))
                .andExpect(jsonPath("number", is(0)))
                .andExpect(jsonPath("size", is(10)));
    }

    private Collection<Person> personListTest() {

        List<Person> result = new ArrayList<>();
        result.add(new Person("test1", "http://test.com", null));
        result.add(new Person("test2", "http://test.com", null));
        result.add(new Person("test3", "http://test.com", null));
        result.add(getFirstPerson());
        return result;
    }

    private Person getFirstPerson() {
        return new Person("aaaaaa", "http://test.com", null);
    }

    private List<Person> getSavedPersons() {
        return StreamSupport.stream(personRepository.findAll().spliterator(), false)
                .sorted(Comparator.comparing(Person::getName))
                .collect(Collectors.toList());
    }

}