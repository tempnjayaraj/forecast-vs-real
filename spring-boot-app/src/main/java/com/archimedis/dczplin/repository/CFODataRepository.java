package com.archimedis.dczplin.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.archimedis.dczplin.model.CFOData;

@Repository
@Component
public interface CFODataRepository extends CrudRepository<CFOData, String> {

	@Query(value = "select cd.status, cd.\"_year\" ,cd.cfo_data_id, cd.\"_month\" ,cd.gst ,cd.tds ,cd.amount,c.cfo_id \r\n"
			+ "from cashflowobjects c left join cfo_data cd on cd.cfo_id = c.cfo_id \r\n"
			+ "where cd.isforecast =true and c.cfo_id = (:cfo_id)", nativeQuery = true)
	List<CFOData> getCFOForecastDataForID(@Param("cfo_id") String cfo_id);
	
	@Query(value = "select cd.status, cd.\"_year\" ,cd.cfo_data_id, cd.\"_month\" ,cd.gst ,cd.tds ,cd.amount,c.cfo_id  \r\n"
			+ "from cashflowobjects c left join cfo_data cd on cd.cfo_id = c.cfo_id \r\n"
			+ "where cd.isforecast =false and c.cfo_id = (:cfo_id)", nativeQuery = true)
	List<CFOData> getCFORealDataForID(@Param("cfo_id") String cfo_id);
	
	@Modifying
	@Transactional
	@Query(value = "insert into cfo_data (cfo_id,_year,_month,gst,tds,amount,isForecast,status) \r\n"
			+ "values (:cfo_id,:year,:month,:gst,:tds,:amount,:isForecast,1)", nativeQuery = true)
	void putForeCastData(@Param("cfo_id") String cfo_id,
						@Param("year") int year,
						@Param("month") int month,
						@Param("gst") int gst,
						@Param("tds") int tds,
						@Param("amount") int amount,
						@Param("isForecast") boolean isForecast
						);
	
	@Modifying
	@Transactional
	@Query(value = "insert into cfo_data (cfo_id,_year,_month,gst,tds,amount,isForecast,status) \r\n"
			+ "values (:cfo_id,:year,:month,:gst,:tds,:amount,false,:status)", nativeQuery = true)
	void putRealData(@Param("cfo_id") String cfo_id,
						@Param("year") int year,
						@Param("month") int month,
						@Param("gst") int gst,
						@Param("tds") int tds,
						@Param("amount") int amount,
						@Param("status") int status
						);

	@Modifying
	@Transactional
	@Query(value = "delete from cfo_data where cfo_id = :cfo_id \r\n"
			+ "and _year = :year and _month = :month and status = 0", nativeQuery = true)
	void deleteForecastEntry(@Param("cfo_id") String cfo_id,
						@Param("year") int year,
						@Param("month") int month
						);
	
	@Modifying
	@Transactional
	@Query(value = "delete from cfo_data where cfo_id = :cfo_id \r\n"
			+ "and _year = :year and _month = :month and status = 0", nativeQuery = true)
	void newCFO(@Param("cfo_id") String cfo_id,
						@Param("year") int year,
						@Param("month") int month
						);
}
