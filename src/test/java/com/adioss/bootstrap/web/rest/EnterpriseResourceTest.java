package com.adioss.bootstrap.web.rest;

import java.util.*;
import java.util.stream.*;
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
import com.adioss.bootstrap.domain.Enterprise;
import com.adioss.bootstrap.repository.EnterpriseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SuppressWarnings("SpringJavaAutowiredMembersInspection")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class EnterpriseResourceTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private EnterpriseRepository enterpriseRepository;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        enterpriseRepository.deleteAll();
    }

    @Test
    public void shouldCreateEnterprise() throws Exception {
        // Given
        Enterprise enterprise = getFirstAndFilteredEnterprise();
        String content = new ObjectMapper().writeValueAsString(enterprise);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/enterprises")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<Enterprise> enterprises = getSavedEnterprises();
        Assert.assertEquals(1, enterprises.size());
        Assert.assertEquals(enterprise.getName(), enterprises.get(0).getName());
    }

    @Test
    public void shouldUpdateEnterprise() throws Exception {
        // Given
        Enterprise enterprise = enterpriseRepository.save(getFirstAndFilteredEnterprise());
        enterprise.setName("nameChanged");
        enterprise.setUrl("http://www.urlchanged.com");
        String content = new ObjectMapper().writeValueAsString(enterprise);

        // When
        ResultActions perform = this.mockMvc.perform(MockMvcRequestBuilders.put("/api/enterprises")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(content));

        // Then
        perform.andExpect(status().isOk());
        List<Enterprise> enterprises = getSavedEnterprises();
        Assert.assertEquals(1, enterprises.size());
        Assert.assertEquals(enterprise.getName(), enterprises.get(0).getName());
        Assert.assertEquals(enterprise.getUrl(), enterprises.get(0).getUrl());
    }

    @Test
    public void shouldRemoveEnterprise() throws Exception {
        // Given
        Enterprise enterprise = enterpriseRepository.save(getFirstAndFilteredEnterprise());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.delete("/api/enterprises/" + enterprise.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        Assert.assertEquals(0, getSavedEnterprises().size());
    }

    @Test
    public void shouldRetrieveEnterprise() throws Exception {
        // Given
        Enterprise enterprise = enterpriseRepository.save(getFirstAndFilteredEnterprise());

        // When
        ResultActions perform =
                this.mockMvc.perform(MockMvcRequestBuilders.get("/api/enterprises/" + enterprise.getId())
                        .contentType(MediaType.APPLICATION_JSON_VALUE));

        // Then
        perform.andExpect(status().isOk());
        List<Enterprise> enterprises = getSavedEnterprises();
        Assert.assertEquals(1, enterprises.size());
        Assert.assertEquals(enterprise.getName(), enterprises.get(0).getName());
        Assert.assertEquals(enterprise.getUrl(), enterprises.get(0).getUrl());
    }

    @Test
    public void shouldListEnterprise() throws Exception {
        // Given
        enterpriseRepository.save(enterpriseListTest());
        List<Enterprise> enterprises = getSavedEnterprises();

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.get("/api/enterprises")
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE));

        // Then
        perform.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("content", hasSize(4)))
                .andExpect(jsonPath("content[0].id", is(enterprises.get(0).getId().intValue())))
                .andExpect(jsonPath("content[0].name", is(enterprises.get(0).getName())))
                .andExpect(jsonPath("content[3].id", is(enterprises.get(3).getId().intValue())))
                .andExpect(jsonPath("content[3].name", is(enterprises.get(3).getName())))
                .andExpect(jsonPath("sort[0].direction", is("ASC")))
                .andExpect(jsonPath("sort[0].property", is("name")))
                .andExpect(jsonPath("sort[0].ascending", is(true)))
                .andExpect(jsonPath("first", is(true)))
                .andExpect(jsonPath("numberOfElements", is(4)))
                .andExpect(jsonPath("number", is(0)))
                .andExpect(jsonPath("size", is(10)));
    }

    @Test
    public void shouldSearchEnterprise() throws Exception {
        // Given
        enterpriseRepository.save(enterpriseListTest());

        // When
        ResultActions perform = this.mockMvc
                .perform(MockMvcRequestBuilders.get("/api/enterprises/search/filt")
                        .accept(MediaType.APPLICATION_JSON_UTF8_VALUE));

        // Then
        perform.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is(getFirstAndFilteredEnterprise().getName())));
    }

    private Collection<Enterprise> enterpriseListTest() {

        List<Enterprise> result = new ArrayList<>();
        result.add(new Enterprise("test1", "http://test.com"));
        result.add(new Enterprise("test2", "http://test.com"));
        result.add(new Enterprise("test3", "http://test.com"));
        result.add(getFirstAndFilteredEnterprise());
        return result;
    }

    private Enterprise getFirstAndFilteredEnterprise() {
        return new Enterprise("filtered", "http://test.com");
    }

    private List<Enterprise> getSavedEnterprises() {
        return StreamSupport.stream(enterpriseRepository.findAll().spliterator(), false)
                .sorted(Comparator.comparing(Enterprise::getName))
                .collect(Collectors.toList());
    }

}
