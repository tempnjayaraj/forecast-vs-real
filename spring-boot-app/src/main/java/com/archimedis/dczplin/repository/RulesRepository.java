package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Rules;

@Repository
@Component
public interface RulesRepository extends CrudRepository<Rules, String> {

	@Query(value="select * from rules where parent is null and category_id=(:id)",nativeQuery = true)
	List<Rules> getRuleSet(@Param(value="id") int id);
	
	@Query(value="select * from rules where parent=(:id)",nativeQuery = true)
	List<Rules> getRule(@Param(value="id") int id);
	
}