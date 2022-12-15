package com.archimedis.dczplin.repository;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Country;

@Component
@Repository
public interface CountryRepository extends CrudRepository<Country,String> {

	@Query(value = "select * from country",nativeQuery = true)
	List<Country>findbycountry();
	
	@Query(value = "select country_name from country where country_id = (:id)",nativeQuery = true)
	String findCountryName(@Param("id") long id);
}
