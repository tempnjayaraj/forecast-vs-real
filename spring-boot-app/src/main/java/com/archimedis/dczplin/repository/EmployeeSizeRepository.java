package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Master;
@Repository
@Component
public interface EmployeeSizeRepository extends CrudRepository<Master, String> {
	
	@Query( value = "select * from master where object_id = (:object_id)", nativeQuery = true)
	List<Master> getEmployeeSize(@Param("object_id") int object_id);
	
	@Query( value = "select * from master where object_id = 6 and id = (:id)", nativeQuery = true)
	Master getEmployeeSizebyID(@Param("id") long id );
	
}
