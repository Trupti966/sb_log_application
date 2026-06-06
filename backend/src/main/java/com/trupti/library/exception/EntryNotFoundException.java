package com.trupti.library.exception;

public class EntryNotFoundException extends RuntimeException {
    public EntryNotFoundException(Long id) {
        super("Entry not found with id: " + id);
    }
}
