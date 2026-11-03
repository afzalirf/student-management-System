package com.cwm.studentmanagement.controller.api;

import java.util.Map;
import org.springframework.web.bind.annotation.*;
import com.cwm.studentmanagement.service.DashboardService;
import com.cwm.studentmanagement.service.EnrollmentService;

@RestController
@RequestMapping("/api/dashboard")
public class ApiDashboardController {
    private final DashboardService dashboard; private final EnrollmentService enrollments;
    public ApiDashboardController(DashboardService dashboard, EnrollmentService enrollments) { this.dashboard=dashboard; this.enrollments=enrollments; }
    @GetMapping public Map<String,Object> get() { return Map.of("stats", dashboard.getDashboardStats(), "recentEnrollments", enrollments.getRecentlyEnrolledStudents()); }
}
