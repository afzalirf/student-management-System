package com.cwm.studentmanagement.controller.api;

import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.cwm.studentmanagement.dto.CourseDTO;
import com.cwm.studentmanagement.service.CourseService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
@Validated
public class ApiCourseController {
    private final CourseService service;
    public ApiCourseController(CourseService service) { this.service = service; }
    @GetMapping public Page<CourseDTO> list(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="10") int size) { return service.getCourses(Math.max(0,page), Math.min(Math.max(1,size),100)); }
    @GetMapping("/all") public java.util.List<CourseDTO> all() { return service.getAllCourses(); }
    @GetMapping("/{id}") public CourseDTO get(@PathVariable Long id) { return service.getCourseById(id); }
    @PostMapping public ResponseEntity<?> create(@Valid @RequestBody CourseDTO dto) {
        if (service.existsByCourseCode(dto.getCourseCode())) return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Course code already exists."));
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createCourse(dto));
    }
    @PutMapping("/{id}") public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CourseDTO dto) {
        if (service.existsByCourseCodeAndIdNot(dto.getCourseCode(), id)) return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Course code already exists."));
        return ResponseEntity.ok(service.updateCourse(id, dto));
    }
}
