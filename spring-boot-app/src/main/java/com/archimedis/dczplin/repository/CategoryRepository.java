package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Categories;

@Repository
@Component
public interface CategoryRepository extends CrudRepository<Categories, String> {

	
	@Query(value="select * from categories where parent is null and country_id =(:id)", nativeQuery = true)
	List<Categories>getCategoryByCountry(@Param(value= "id") int id);
	
	
	@Query(value="select * from categories where country_id =(:countryId) and parent =(:parentId)", nativeQuery = true)
	List<Categories> getSubcategory(@Param(value="countryId") int countryId, @Param(value="parentId") int parentId);
	
}
