package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="mapping_master")
public class MappingMaster {

	@Id
	@Column(name="map_id")
	int id;
	
	@Column(name="country_id")
	@Transient
	int country_id;
	
	@Column(name="geo_id")
	@Transient
	int geo_id;
	
	@Column(name="object_id")
	int object_id;
	
	@Column(name="object_value")
	int value;
	
	@Column(name="_remove")
	@Transient
	boolean remove;
	
	public MappingMaster() {
		
	}
	
	public MappingMaster( int map_id,int object_id, int object_value) {
		super();
		this.id = map_id;
		
		this.object_id = object_id;
		this.value = object_value;
		
	}
	public int getMap_id() {
		return id;
	}
	public void setMap_id(int map_id) {
		this.id = map_id;
	}
	
	
	public int getObject_id() {
		return object_id;
	}
	public void setObject_id(int object_id) {
		this.object_id = object_id;
	}
	
	public int getObject_value() {
		return value;
	}
	public void setObject_value(int object_value) {
		this.value = object_value;
	}
	
	
	
	
	
	
	
}
