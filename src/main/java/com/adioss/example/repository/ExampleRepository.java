package com.adioss.example.repository;

import com.adioss.example.domain.Example;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document
public interface ExampleRepository extends MongoRepository<Example, String> {
}
