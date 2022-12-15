package com.archimedis.dczplin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.MappingMaster;

@Repository
@Component
public interface MappingMasterRepository extends CrudRepository<MappingMaster,String>{

	@Query( value = "select map_id,object_value from mapping_master where country_id =(:id) and object_id=1", nativeQuery = true)
	List<MappingMaster> getObject1ByCountry(@Param(value= "id") int id );
	
	@Query( value = "select object_value from mapping_master where country_id =(:id) and object_id=(:object_id) order by map_id", nativeQuery = true)
	List<Integer> getObjectByCountry(@Param(value= "id") int id ,@Param(value= "object_id") int object_id );
	
}
