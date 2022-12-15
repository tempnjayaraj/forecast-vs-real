package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Custom;

@Component
@Repository
public interface CustomRepo extends CrudRepository<Custom, String> {

	@Query( value = "select m.id ,m.object_value ,n.object_value as question from master m left join master n on m.questionparent = n.id where m.id =:id", nativeQuery = true)
	public List<Custom> getExceptionGeoCategories(@Param("id") long id);
}
