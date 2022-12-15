package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name="master")
@Component
public class Custom {
	@Id
	int id;
	
	@Column(name="object_value")
	String value;
	
//	@OneToOne(optional=false)
	@JoinColumn(name="object_value",insertable=false, updatable=false)
	String question;
	

}
