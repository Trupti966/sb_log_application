package com.trupti.library.service.impl;

import com.trupti.library.dto.EntryRequest;
import com.trupti.library.dto.EntryResponse;
import com.trupti.library.exception.EntryNotFoundException;
import com.trupti.library.mapper.EntryMapper;
import com.trupti.library.model.Entry;
import com.trupti.library.repository.EntryRepository;
import com.trupti.library.service.EntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntryServiceImpl implements EntryService {

    private final EntryRepository repository;
    private final EntryMapper mapper;

    @Override
    public EntryResponse createEntry(EntryRequest request) {
        Entry entry = mapper.toEntity(request);
        repository.save(entry);
        return mapper.toResponse(entry);
    }

    @Override
    public List<EntryResponse> getAllEntries() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public EntryResponse getEntry(Long id) {
        Entry entry = repository.findById(id)
                .orElseThrow(() -> new EntryNotFoundException(id));

        return mapper.toResponse(entry);
    }

    @Override
    public EntryResponse updateEntry(Long id, EntryRequest request) {
        Entry entry = repository.findById(id)
                .orElseThrow(() -> new EntryNotFoundException(id));

        entry.setQuestion(request.getQuestion());
        entry.setAnswerPoints(request.getAnswerPoints());
        entry.setExampleExplanation(request.getExampleExplanation());
        entry.setCodeSnippet(request.getCodeSnippet());
        entry.setCodeExplanationSteps(request.getCodeExplanationSteps());
        entry.setTags(request.getTags());

        repository.save(entry);

        return mapper.toResponse(entry);
    }

    @Override
    public void deleteEntry(Long id) {
        if (!repository.existsById(id)) {
            throw new EntryNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
