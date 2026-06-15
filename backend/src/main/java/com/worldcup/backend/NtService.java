package com.worldcup.backend;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class NtService {
    private NtRespository ntRespository;

    public NtService(NtRespository ntRespository){
        this.ntRespository = ntRespository;
    }

    public List<NationalTeam> getAllTeams(){
        return ntRespository.findAll();
    }
}
