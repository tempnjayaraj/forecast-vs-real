package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.CFO;

@Repository
@Component
public interface CFORepository extends CrudRepository<CFO, String> {

	@Query(value = "select * from cashflowobjects where cfo_isInFlow = (:isInFlow)", nativeQuery = true)
	List<CFO> getCFOs(@Param("isInFlow") Boolean isInFlow);

}
