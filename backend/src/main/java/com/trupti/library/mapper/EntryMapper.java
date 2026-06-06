package com.trupti.library.mapper;

import com.trupti.library.dto.EntryRequest;
import com.trupti.library.dto.EntryResponse;
import com.trupti.library.model.Entry;
import org.springframework.stereotype.Component;

@Component
public class EntryMapper {

    public Entry toEntity(EntryRequest request) {
        return Entry.builder()
                .question(request.getQuestion())
                .answerPoints(request.getAnswerPoints())
                .exampleExplanation(request.getExampleExplanation())
                .codeSnippet(request.getCodeSnippet())
                .codeExplanationSteps(request.getCodeExplanationSteps())
                .tags(request.getTags())
                .build();
    }

    public EntryResponse toResponse(Entry entity) {
        return EntryResponse.builder()
                .id(entity.getId())
                .question(entity.getQuestion())
                .answerPoints(entity.getAnswerPoints())
                .exampleExplanation(entity.getExampleExplanation())
                .codeSnippet(entity.getCodeSnippet())
                .codeExplanationSteps(entity.getCodeExplanationSteps())
                .tags(entity.getTags())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
