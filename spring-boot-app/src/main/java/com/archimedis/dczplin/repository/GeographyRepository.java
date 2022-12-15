package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Geography;

@Component
@Repository
public interface GeographyRepository extends CrudRepository<Geography, String> {
	@Query( value = "select geo_id,geo_name ,geo_category_id  from geographies "
			+ " where country_id = (:country_id) and geo_category_id = (:geo_category_id)", nativeQuery = true)
	List<Geography> getGeographiesForCountryAndGeoCategory(@Param("country_id") long country_id, @Param("geo_category_id") long geo_category_id);

	@Query( value = "select geo_category_id from geographies "
			+ " where country_id = (:country_id) and parent is null group by geo_category_id", nativeQuery = true)
	List<Integer> getExceptionGeoCategories(@Param("country_id") long country_id);
	
	@Query(value = "select geo_name from geographies where geo_id = (:id)",nativeQuery = true)
	String findGeoName(@Param("id") long id);
	
	@Query( value = "select * from geographies g where country_id = (:country_id) and parent = (:parent_id)", nativeQuery = true)
	List<Geography> getGeographiesForCountryAndSub(@Param("country_id") long country_id, @Param("parent_id") long parent_id);

	
}
