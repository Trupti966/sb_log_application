package com.trupti.library.service;

import com.trupti.library.dto.EntryRequest;
import com.trupti.library.dto.EntryResponse;

import java.util.List;

public interface EntryService {

    EntryResponse createEntry(EntryRequest request);

    List<EntryResponse> getAllEntries();

    EntryResponse getEntry(Long id);

    EntryResponse updateEntry(Long id, EntryRequest request);

    void deleteEntry(Long id);
}
