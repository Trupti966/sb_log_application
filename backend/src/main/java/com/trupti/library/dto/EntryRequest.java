package com.trupti.library.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class EntryRequest {

    @NotBlank(message = "Question cannot be empty")
    private String question;

    @Size(min = 1, message = "Answer must have at least one point")
    private List<String> answerPoints;

    private String exampleExplanation;

    private String codeSnippet;

    private List<String> codeExplanationSteps;

    private List<String> tags;
}
