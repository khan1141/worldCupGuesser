package com.worldcup.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class NationalTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String teamName;
    private String flagUrl;
    private String groupName;
    private String confederation;
    private Integer fifaRanking;

    public NationalTeam() {}

    public NationalTeam(String teamName, String flagUrl, String groupName, String confederation, Integer fifaRanking) {
        this.teamName = teamName;
        this.flagUrl = flagUrl;
        this.groupName = groupName;
        this.confederation = confederation;
        this.fifaRanking = fifaRanking;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public String getFlagUrl() { return flagUrl; }
    public void setFlagUrl(String flagUrl) { this.flagUrl = flagUrl; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public String getConfederation() { return confederation; }
    public void setConfederation(String confederation) { this.confederation = confederation; }

    public Integer getFifaRanking() { return fifaRanking; }
    public void setFifaRanking(Integer fifaRanking) { this.fifaRanking = fifaRanking; }
}
