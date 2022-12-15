package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Master;

@Component
@Repository
public interface MasterRepo extends CrudRepository<Master, String> {

	@Query( value = "select *  from master m left join master n on m.questionparent = n.id where m.id =:id", nativeQuery = true)
	public Master getExceptionGeoCategories(@Param("id") long id);
}
