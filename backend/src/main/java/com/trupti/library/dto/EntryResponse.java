package com.trupti.library.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class EntryResponse {
    private Long id;
    private String question;
    private List<String> answerPoints;
    private String exampleExplanation;
    private String codeSnippet;
    private List<String> codeExplanationSteps;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

