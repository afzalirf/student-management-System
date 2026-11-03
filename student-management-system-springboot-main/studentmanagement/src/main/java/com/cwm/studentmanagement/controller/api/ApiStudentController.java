package com.cwm.studentmanagement.controller.api;

import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.cwm.studentmanagement.dto.StudentDTO;
import com.cwm.studentmanagement.service.StudentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@Validated
public class ApiStudentController {
    private final StudentService service;
    public ApiStudentController(StudentService service) { this.service = service; }
    @GetMapping public Page<StudentDTO> list(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="10") int size) { return service.getStudents(Math.max(0,page), Math.min(Math.max(1,size),100)); }
    @GetMapping("/{id}") public StudentDTO get(@PathVariable Long id) { return service.getStudentById(id); }
    @PostMapping public ResponseEntity<?> create(@Valid @RequestBody StudentDTO dto) {
        if (service.existsByEmailIgnoreCase(dto.getEmail())) return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already exists."));
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createStudent(dto));
    }
    @PutMapping("/{id}") public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody StudentDTO dto) {
        if (service.existsByEmailIgnoreCaseAndIdNot(dto.getEmail(), id)) return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already exists."));
        return ResponseEntity.ok(service.updateStudent(id, dto));
    }
}
