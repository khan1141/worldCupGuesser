package com.worldcup.backend;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class NtController {

    private final NtService ntService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${anthropic.api.key:}")
    private String anthropicApiKey;

    public NtController(NtService ntService) {
        this.ntService = ntService;
    }

    @GetMapping("/national-teams")
    public List<NationalTeam> getTeams() {
        return ntService.getAllTeams();
    }

    @PostMapping(value = "/claude", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> claudeProxy(@RequestBody Map<String, String> body) throws Exception {
        if (anthropicApiKey == null || anthropicApiKey.isBlank()) {
            return Map.of("content", "Claude AI not configured. Set ANTHROPIC_API_KEY environment variable.");
        }

        String prompt = body.getOrDefault("prompt", "");

        String requestJson = objectMapper.writeValueAsString(Map.of(
            "model", "claude-sonnet-4-6",
            "max_tokens", 256,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        ));

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.anthropic.com/v1/messages"))
            .header("x-api-key", anthropicApiKey)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestJson))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        Map<?, ?> parsed = objectMapper.readValue(response.body(), Map.class);

        String content = "";
        if (parsed.containsKey("content")) {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> contentList = (List<Map<String, Object>>) parsed.get("content");
            if (!contentList.isEmpty()) {
                content = (String) contentList.get(0).getOrDefault("text", "");
            }
        }

        return Map.of("content", content);
    }
}
