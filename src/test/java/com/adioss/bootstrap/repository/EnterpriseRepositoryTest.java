package com.adioss.bootstrap.repository;

import com.adioss.bootstrap.domain.Enterprise;
import com.adioss.bootstrap.domain.Person;
import com.tngtech.java.junit.dataprovider.DataProvider;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static java.util.Collections.singletonList;


@RunWith(DataProviderRunner.class)
public class EnterpriseRepositoryTest {
    private static final String VALID_NAME = "test";
    private static final String VALID_URL = "http://test.com";
    private static final String BIG_STRING = generateBigString();

    private Validator validator;

    @Before
    public void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    public void shouldValidate() throws Exception {
        Set<ConstraintViolation<Enterprise>> validate = validator.validate(new Enterprise("test", "http://test.fr"));
        Assert.assertEquals(0, validate.size());
        Set<Person> persons = new HashSet<>(singletonList(new Person("test", "http://test.fr", null)));
        validate = validator.validate(new Enterprise("test", "http://test.fr", persons));
        Assert.assertEquals(0, validate.size());
    }

    @DataProvider
    public static Object[][] invalidEnterpriseDataProvider() {
        return new Object[][]{
                {new Enterprise(null, VALID_URL), 1},
                {new Enterprise("as", VALID_URL), 1},
                {new Enterprise(BIG_STRING, VALID_URL), 1},
                {new Enterprise(VALID_NAME, null), 1},
                {new Enterprise(VALID_NAME, "as"), 2},
                {new Enterprise(VALID_NAME, BIG_STRING), 2},
                {new Enterprise(VALID_NAME, "testtest"), 1},
                {new Enterprise(VALID_NAME, "http:/testtest"), 1},
                {new Enterprise(VALID_NAME, "http//testtest"), 1},
                {new Enterprise(null, null), 2},
                {new Enterprise(BIG_STRING, BIG_STRING), 3},
        };
    }

    @Test
    @UseDataProvider("invalidEnterpriseDataProvider")
    public void shouldInvalidate(Enterprise enterprise, int expectedErrorsCount) throws Exception {
        Set<ConstraintViolation<Enterprise>> validate = validator.validate(enterprise);
        Assert.assertEquals(expectedErrorsCount, validate.size());
    }

    private static String generateBigString() {
        char[] bytes = new char[300];
        Arrays.fill(bytes, 'a');
        return new String(bytes);
    }
}