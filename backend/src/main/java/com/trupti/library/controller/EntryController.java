package com.trupti.library.controller;

import com.trupti.library.dto.EntryRequest;
import com.trupti.library.dto.EntryResponse;
import com.trupti.library.service.EntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/entries")
public class EntryController {

    private final EntryService entryService;

    // CREATE
    @PostMapping
    public ResponseEntity<EntryResponse> createEntry(@Valid @RequestBody EntryRequest request) {
        return ResponseEntity.ok(entryService.createEntry(request));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<EntryResponse>> getAllEntries() {
        return ResponseEntity.ok(entryService.getAllEntries());
    }

    // GET ONE
    @GetMapping("/{id}")
    public ResponseEntity<EntryResponse> getEntry(@PathVariable Long id) {
        return ResponseEntity.ok(entryService.getEntry(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<EntryResponse> updateEntry(
            @PathVariable Long id,
            @Valid @RequestBody EntryRequest request
    ) {
        return ResponseEntity.ok(entryService.updateEntry(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntry(@PathVariable Long id) {
        entryService.deleteEntry(id);
        return ResponseEntity.ok("Entry deleted successfully");
    }
}
