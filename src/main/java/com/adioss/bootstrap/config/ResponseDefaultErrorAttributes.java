package com.adioss.bootstrap.config;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.DefaultErrorAttributes;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;

@Component
public class ResponseDefaultErrorAttributes extends DefaultErrorAttributes {
    private final MessageSource messageSource;

    @Autowired
    public ResponseDefaultErrorAttributes(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public Map<String, Object> getErrorAttributes(RequestAttributes requestAttributes, boolean includeStackTrace) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(requestAttributes, includeStackTrace);
        Throwable throwable = getError(requestAttributes);
        if (throwable == null) {
            return errorAttributes;
        }
        String errorCode = throwable.getMessage();
        String message = null;
        try {
            message = messageSource.getMessage(errorCode, new Object[0], LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            //
        }
        if (message != null && !message.isEmpty()) {
            List<Map<String, String>> errors = new ArrayList<>();
            HashMap<String, String> error = new HashMap<>();
            error.put("defaultMessage", errorCode);
            errors.add(error);
            errorAttributes.put("errors", errors);
        }
        return errorAttributes;
    }
}
