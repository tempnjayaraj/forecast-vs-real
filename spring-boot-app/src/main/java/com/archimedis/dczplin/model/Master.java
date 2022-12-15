package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Entity
@Table(name="master")
@Component
public class Master {

	@Id
	int id;
	
	int object_id;
	
	String object_value;
	
	@Column(name="questionparent")
	Integer questionParent;
		
	public Master() {
		
	}

	public Master(int id, int object_id, String object_value,Integer questionParent) {
		super();
		this.id = id;
		this.object_id = object_id;
		this.object_value = object_value;
		this.questionParent = questionParent;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getObject_id() {
		return object_id;
	}

	public void setObject_id(int object_id) {
		this.object_id = object_id;
	}

	public String getObject_value() {
		return object_value;
	}

	public void setObject_value(String object_value) {
		this.object_value = object_value;
	}

	public Integer getQuestionParent() {
		return questionParent;
	}

	public void setQuestionParent(Integer questionParent) {
		this.questionParent = questionParent;
	}
	
	
	
	
	
	
	
}
