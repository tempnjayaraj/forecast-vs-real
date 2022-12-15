package com.archimedis.dczplin.repository;

import java.lang.reflect.Array;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.Master;


@Component
@Repository
public interface QuestionRepository extends CrudRepository<Master, String>{

	
//	@Query(value="select * from master where object_id=1")
//	List<Question> findbyobject_id();
	@Query(value="select * from master",nativeQuery = true)
	@Override
	List<Master> findAll();
	
	
	@Query( value = "select * from master where object_id = (:object_id)", nativeQuery = true)
		List<Master> getQuestions(@Param("object_id") int object_id);
	
	@Query( value = "select * from master where object_id = 1 and id = (:id)", nativeQuery = true)
	Master getQuestionbyID(@Param("id") long id );
	
	@Query( value = "select * from master where object_id = 1 and id = ($obj)", nativeQuery = true)
	Master getQuestionbyJson(@Param("id") Array obj );
	
	@Query( value = "select * from master where id in (select questionparent from master where id = (:id))"
		, nativeQuery = true)
	Master getParentQuestionbyJson(@Param("id") long obj );
	
	}
	
	

	
	
