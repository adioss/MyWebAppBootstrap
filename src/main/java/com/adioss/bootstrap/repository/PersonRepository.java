package com.adioss.bootstrap.repository;

import com.adioss.bootstrap.domain.Person;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
}
