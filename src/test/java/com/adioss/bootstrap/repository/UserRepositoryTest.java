package com.adioss.bootstrap.repository;

import com.adioss.bootstrap.domain.User;
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

import static com.adioss.bootstrap.domain.Language.ENGLISH;


@RunWith(DataProviderRunner.class)
public class UserRepositoryTest {
    private static final String VALID_USERNAME = "test";
    private static final String VALID_MAIL = "test@test.com";
    private static final String BIG_STRING = generateBigString();
    private static final String VALID_PASSWORD = "pass";

    private Validator validator;

    @Before
    public void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    public void shouldValidate() throws Exception {
        User test = new User(VALID_USERNAME, VALID_MAIL, VALID_PASSWORD, ENGLISH, null);
        Set<ConstraintViolation<User>> validate = validator.validate(test);
        Assert.assertEquals(0, validate.size());
    }

    @DataProvider
    public static Object[][] invalidUserDataProvider() {
        return new Object[][]{
                {new User(null, VALID_MAIL, VALID_PASSWORD, ENGLISH, null), 1},
                {new User("as", VALID_MAIL, VALID_PASSWORD, ENGLISH, null), 1},
                {new User(BIG_STRING, VALID_MAIL, VALID_PASSWORD, ENGLISH, null), 1},
                {new User(VALID_USERNAME, "as", VALID_PASSWORD, ENGLISH, null), 2},
                {new User(VALID_USERNAME, BIG_STRING, VALID_PASSWORD, ENGLISH, null), 2},
                {new User(VALID_USERNAME, "fdsfds@", VALID_PASSWORD, ENGLISH, null), 1},
                {new User(VALID_USERNAME, "fdsfds@fdsfds", VALID_PASSWORD, ENGLISH, null), 1},
                {new User(VALID_USERNAME, "@sdfdsf.cmo", VALID_PASSWORD, ENGLISH, null), 1},
                {new User(null, null, VALID_PASSWORD, ENGLISH, null), 2},
                {new User(BIG_STRING, BIG_STRING, VALID_PASSWORD, ENGLISH, null), 3},
        };
    }

    @Test
    @UseDataProvider("invalidUserDataProvider")
    public void shouldInvalidate(User user, int expectedErrorsCount) throws Exception {
        Set<ConstraintViolation<User>> validate = validator.validate(user);
        Assert.assertEquals(expectedErrorsCount, validate.size());
    }

    private static String generateBigString() {
        char[] bytes = new char[300];
        Arrays.fill(bytes, 'a');
        return new String(bytes);
    }
}