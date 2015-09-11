package com.adioss.example.domain;

import org.springframework.data.annotation.Id;

public class AbstractDocument {

    @Id
    private String id;

    public String getId() {
        return id;
    }

    public String getElementType() {
        return this.getClass().getSimpleName();
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (this.id == null || obj == null || !(this.getClass().equals(obj.getClass()))) {
            return false;
        }

        AbstractDocument that = (AbstractDocument) obj;

        return this.id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id.hashCode();
    }
}
