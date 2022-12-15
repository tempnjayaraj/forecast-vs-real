package com.archimedis.dczplin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.CFO;
import com.archimedis.dczplin.repository.CFORepository;


@Service
@Component
public class CFOService {

	@Autowired
	CFORepository repo;
	
	public List<CFO> getInFlowObjects(){
		return repo.getCFOs(true);
	}
	
	public List<CFO> getOutFlowObjects(){
		return repo.getCFOs(false);
	}
	
	
}