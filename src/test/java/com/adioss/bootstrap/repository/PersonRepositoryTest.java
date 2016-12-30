package com.adioss.bootstrap.repository;

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
import java.util.Set;


@RunWith(DataProviderRunner.class)
public class PersonRepositoryTest {
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
        Set<ConstraintViolation<Person>> validate = validator.validate(new Person("test", "http://test.fr", null));
        Assert.assertEquals(0, validate.size());
        validate = validator.validate(new Person("test", "http://test.fr", null));
        Assert.assertEquals(0, validate.size());
    }

    @DataProvider
    public static Object[][] invalidPersonDataProvider() {
        return new Object[][]{
                {new Person(null, VALID_URL, null), 1},
                {new Person("as", VALID_URL, null), 1},
                {new Person(BIG_STRING, VALID_URL, null), 1},
                {new Person(VALID_NAME, null, null), 1},
                {new Person(VALID_NAME, "as", null), 2},
                {new Person(VALID_NAME, BIG_STRING, null), 2},
                {new Person(VALID_NAME, "testtest", null), 1},
                {new Person(VALID_NAME, "http:/testtest", null), 1},
                {new Person(VALID_NAME, "http//testtest", null), 1},
                {new Person(null, null, null), 2},
                {new Person(BIG_STRING, BIG_STRING, null), 3},
        };
    }

    @Test
    @UseDataProvider("invalidPersonDataProvider")
    public void shouldInvalidate(Person person, int expectedErrorsCount) throws Exception {
        Set<ConstraintViolation<Person>> validate = validator.validate(person);
        Assert.assertEquals(expectedErrorsCount, validate.size());
    }

    private static String generateBigString() {
        char[] bytes = new char[300];
        Arrays.fill(bytes, 'a');
        return new String(bytes);
    }
}