package com.cwm.studentmanagement.controller.api;

import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cwm.studentmanagement.dto.EnrollmentDTO;
import com.cwm.studentmanagement.dto.EnrollmentSummaryDTO;
import com.cwm.studentmanagement.service.CourseService;
import com.cwm.studentmanagement.service.StudentService;
import com.cwm.studentmanagement.service.EnrollmentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/enrollments")
public class ApiEnrollmentController {
    private final CourseService courses; private final StudentService students; private final EnrollmentService enrollments;
    public ApiEnrollmentController(CourseService courses, StudentService students, EnrollmentService enrollments) { this.courses=courses; this.students=students; this.enrollments=enrollments; }
    @GetMapping("/options") public Map<String,Object> options() { return Map.of("students", students.getAllStudents(), "courses", courses.getAllCourses()); }
    @GetMapping public Page<EnrollmentSummaryDTO> list(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="10") int size) { return enrollments.getEnrolledStudents(Math.max(0,page), Math.min(Math.max(1,size),100)); }
    @GetMapping("/{studentId}") public EnrollmentSummaryDTO detail(@PathVariable Long studentId) { return enrollments.findEnrolledStudentCourseDetails(studentId); }
    @PostMapping public ResponseEntity<?> create(@Valid @RequestBody EnrollmentDTO dto) { enrollments.enrollStudentToCourses(dto); return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Enrollment saved successfully.")); }
}
