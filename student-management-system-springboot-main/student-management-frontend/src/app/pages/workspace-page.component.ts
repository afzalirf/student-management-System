
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ApiService,
  ApiPage,
  Student,
  Course,
  EnrollmentSummary
} from '../core/api.service';

@Component({
  selector: 'app-workspace-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  template: `
    <div class="container-fluid px-4 py-4">

      @switch (page) {

        @case ('dashboard') {
          <div class="dashboard-page">
            <section class="welcome-panel">
              <div>
                <div class="welcome-tag"><i class="bi bi-stars"></i> Campus overview</div>
                <h1>Good day, Admin.</h1>
                <p>Here is what's happening across your learning community today.</p>
              </div>
              <div class="welcome-illustration"><i class="bi bi-mortarboard-fill"></i></div>
            </section>

            @if (error) {
              <div class="alert alert-danger">{{ error }}</div>
            }

            <section class="metric-grid">
              <article class="metric-card" style="--metric-color:#286b5b;--metric-soft:#e8f2ed">
                <div class="metric-top">
                  <span class="metric-label">Total students</span>
                  <span class="metric-icon"><i class="bi bi-people-fill"></i></span>
                </div>
                <div class="metric-value">{{ stats?.totalStudents ?? 0 }}</div>
                <div class="metric-note">Registered learner profiles</div>
              </article>

              <article class="metric-card" style="--metric-color:#a45e32;--metric-soft:#fbefe5">
                <div class="metric-top">
                  <span class="metric-label">Active courses</span>
                  <span class="metric-icon"><i class="bi bi-journal-bookmark-fill"></i></span>
                </div>
                <div class="metric-value">{{ stats?.totalCourses ?? 0 }}</div>
                <div class="metric-note">Courses in your catalogue</div>
              </article>

              <article class="metric-card" style="--metric-color:#547a9a;--metric-soft:#eaf1f7">
                <div class="metric-top">
                  <span class="metric-label">Top course</span>
                  <span class="metric-icon"><i class="bi bi-award-fill"></i></span>
                </div>
                <div class="metric-value" style="font-size:clamp(18px,2vw,25px)">{{ stats?.topPerformingCourse ?? 'N/A' }}</div>
                <div class="metric-note">Most engaged course</div>
              </article>

              <article class="metric-card" style="--metric-color:#8a7550;--metric-soft:#f5f0e4">
                <div class="metric-top">
                  <span class="metric-label">New enrollments</span>
                  <span class="metric-icon"><i class="bi bi-person-check-fill"></i></span>
                </div>
                <div class="metric-value">{{ stats?.studentsEnrolledThisMonth ?? 0 }}</div>
                <div class="metric-note">Students enrolled this month</div>
              </article>
            </section>

            <section class="dashboard-lower">
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <div>
                    <h3>Recent student activity</h3>
                    <small>Latest enrollment records</small>
                  </div>
                  <a routerLink="/enrollments" class="btn btn-sm btn-secondary">View all</a>
                </div>
                <div class="table-responsive panel-content">
                  <table class="table recent-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Total fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (x of recent; track x.studentId) {
                        <tr>
                          <td>
                            <span class="student-chip">
                              <span class="student-avatar">{{ (x.studentName || 'S').charAt(0) }}</span>
                              {{ x.studentName }}
                            </span>
                          </td>
                          <td>{{ x.email }}</td>
                          <td>{{ x.courseCount }}</td>
                          <td>{{ x.totalFee | currency:'INR' }}</td>
                        </tr>
                      } @empty {
                        <tr><td colspan="4" class="text-center text-muted py-4">No recent enrollments yet.</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="dashboard-panel">
                <div class="panel-heading">
                  <div>
                    <h3>Quick actions</h3>
                    <small>Common administration tasks</small>
                  </div>
                </div>
                <div class="panel-content">
                  <a routerLink="/students/new" class="quick-action">
                    <i class="bi bi-person-plus-fill"></i><span>Add a student</span><i class="bi bi-arrow-up-right action-arrow"></i>
                  </a>
                  <a routerLink="/courses/new" class="quick-action">
                    <i class="bi bi-journal-plus"></i><span>Create a course</span><i class="bi bi-arrow-up-right action-arrow"></i>
                  </a>
                  <a routerLink="/enrollments/new" class="quick-action">
                    <i class="bi bi-clipboard2-check-fill"></i><span>Enroll a student</span><i class="bi bi-arrow-up-right action-arrow"></i>
                  </a>
                  <a routerLink="/students" class="quick-action">
                    <i class="bi bi-people-fill"></i><span>Browse students</span><i class="bi bi-arrow-up-right action-arrow"></i>
                  </a>
                </div>
              </div>
            </section>
          </div>
        }

        @case ('students') {
          <div class="d-flex justify-content-between mb-4">
            <h2>Students</h2>
            <a routerLink="/students/new" class="btn btn-primary">
              Add New Student
            </a>
          </div>

          <div class="card">
            <div class="card-header">Student List</div>

            <div class="card-body table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (s of studentsPage?.content || []; track s.id) {
                    <tr>
                      <td>{{ s.id }}</td>
                      <td>{{ s.firstName }} {{ s.lastName }}</td>
                      <td>{{ s.email }}</td>
                      <td>{{ s.phoneNumber }}</td>
                      <td>
                        <a
                          [routerLink]="['/students', s.id]"
                          class="btn btn-sm btn-info text-white me-1">
                          View
                        </a>
                        <a
                          [routerLink]="['/students', s.id, 'edit']"
                          class="btn btn-sm btn-warning text-white">
                          Edit
                        </a>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="5">No students found.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="card-footer d-flex justify-content-between">
              <button
                class="btn btn-outline-secondary btn-sm"
                (click)="loadStudents(currentPage - 1)"
                [disabled]="currentPage === 0">
                Previous
              </button>

              <span>
                Page {{ currentPage + 1 }} / {{ studentsPage?.totalPages || 1 }}
              </span>

              <button
                class="btn btn-outline-secondary btn-sm"
                (click)="loadStudents(currentPage + 1)"
                [disabled]="!studentsPage || currentPage + 1 >= studentsPage.totalPages">
                Next
              </button>
            </div>
          </div>
        }

        @case ('studentForm') {
          <div class="d-flex justify-content-between mb-4">
            <h2>{{ isEdit ? 'Edit Student' : 'Add New Student' }}</h2>
            <a routerLink="/students" class="btn btn-secondary">Back to List</a>
          </div>

          <div class="card">
            <div class="card-header">Student Details</div>

            <div class="card-body">
              <form (ngSubmit)="saveStudent()">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">First Name</label>
                    <input
                      class="form-control"
                      name="firstName"
                      [(ngModel)]="studentForm.firstName"
                      required>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Last Name</label>
                    <input
                      class="form-control"
                      name="lastName"
                      [(ngModel)]="studentForm.lastName"
                      required>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      [(ngModel)]="studentForm.email"
                      required>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Phone Number</label>
                    <input
                      class="form-control"
                      name="phoneNumber"
                      [(ngModel)]="studentForm.phoneNumber">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    name="address"
                    [(ngModel)]="studentForm.address">
                  </textarea>
                </div>

                <button class="btn btn-primary" [disabled]="busy">
                  {{ isEdit ? 'Update Student' : 'Save Student' }}
                </button>
              </form>
            </div>
          </div>
        }

        @case ('studentView') {
          <div class="d-flex justify-content-between mb-4">
            <h2>Student Details</h2>
            <a routerLink="/students" class="btn btn-secondary">Back to List</a>
          </div>

          @if (student) {
            <div class="card">
              <div class="card-header">Student Information</div>

              <div class="card-body">
                <p><b>Name:</b> {{ student.firstName }} {{ student.lastName }}</p>
                <p><b>Email:</b> {{ student.email }}</p>
                <p><b>Phone:</b> {{ student.phoneNumber || '—' }}</p>
                <p><b>Address:</b> {{ student.address || '—' }}</p>

                <a
                  [routerLink]="['/students', student.id, 'edit']"
                  class="btn btn-primary">
                  Edit Student
                </a>
              </div>
            </div>
          }
        }

        @case ('courses') {
          <div class="d-flex justify-content-between mb-4">
            <h2>Courses</h2>
            <a routerLink="/courses/new" class="btn btn-primary">Add New Course</a>
          </div>

          <div class="card">
            <div class="card-header">Course List</div>

            <div class="card-body table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Course Fees</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  @for (c of coursesPage?.content || []; track c.id) {
                    <tr>
                      <td>{{ c.id }}</td>
                      <td>{{ c.courseName }}</td>
                      <td>{{ c.courseCode }}</td>
                      <td>{{ c.fee | currency:'INR' }}</td>
                      <td>{{ c.duration }}</td>
                      <td>
                        <a
                          [routerLink]="['/courses', c.id]"
                          class="btn btn-sm btn-info text-white me-1">
                          View
                        </a>
                        <a
                          [routerLink]="['/courses', c.id, 'edit']"
                          class="btn btn-sm btn-warning text-white">
                          Edit
                        </a>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6">No courses found.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="card-footer d-flex justify-content-between">
              <button
                class="btn btn-outline-secondary btn-sm"
                (click)="loadCourses(currentPage - 1)"
                [disabled]="currentPage === 0">
                Previous
              </button>

              <span>
                Page {{ currentPage + 1 }} / {{ coursesPage?.totalPages || 1 }}
              </span>

              <button
                class="btn btn-outline-secondary btn-sm"
                (click)="loadCourses(currentPage + 1)"
                [disabled]="!coursesPage || currentPage + 1 >= coursesPage.totalPages">
                Next
              </button>
            </div>
          </div>
        }

        @case ('courseForm') {
          <div class="d-flex justify-content-between mb-4">
            <h2>{{ isEdit ? 'Edit Course' : 'Add New Course' }}</h2>
            <a routerLink="/courses" class="btn btn-secondary">Back to List</a>
          </div>

          <div class="card">
            <div class="card-header">Course Details</div>

            <div class="card-body">
              <form (ngSubmit)="saveCourse()">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Course Name</label>
                    <input
                      class="form-control"
                      name="courseName"
                      [(ngModel)]="courseForm.courseName"
                      required>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Course Code</label>
                    <input
                      class="form-control"
                      name="courseCode"
                      [(ngModel)]="courseForm.courseCode"
                      required>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Duration</label>
                    <input
                      class="form-control"
                      name="duration"
                      [(ngModel)]="courseForm.duration"
                      required>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Course Fee (₹)</label>
                    <input
                      type="number"
                      class="form-control"
                      name="fee"
                      [(ngModel)]="courseForm.fee"
                      required
                      min="0">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    rows="4"
                    name="description"
                    [(ngModel)]="courseForm.description">
                  </textarea>
                </div>

                <button class="btn btn-primary" [disabled]="busy">
                  {{ isEdit ? 'Update Course' : 'Save Course' }}
                </button>
              </form>
            </div>
          </div>
        }

        @case ('courseView') {
          <div class="d-flex justify-content-between mb-4">
            <h2>Course Details</h2>
            <a routerLink="/courses" class="btn btn-secondary">Back to List</a>
          </div>

          @if (course) {
            <div class="card">
              <div class="card-header">Course Information</div>

              <div class="card-body">
                <p><b>Course:</b> {{ course.courseName }}</p>
                <p><b>Code:</b> {{ course.courseCode }}</p>
                <p><b>Duration:</b> {{ course.duration }}</p>
                <p><b>Fee:</b> {{ course.fee | currency:'INR' }}</p>
                <p><b>Description:</b> {{ course.description }}</p>

                <a
                  [routerLink]="['/courses', course.id, 'edit']"
                  class="btn btn-primary">
                  Edit Course
                </a>
              </div>
            </div>
          }
        }

        @case ('enroll') {
          <div class="d-flex justify-content-between mb-4">
            <h2>Enroll Student to Course</h2>
            <a routerLink="/enrollments" class="btn btn-secondary">
              View Enrollments
            </a>
          </div>

          <div class="card">
            <div class="card-header">Enrollment Details</div>

            <div class="card-body">
              <form (ngSubmit)="submitEnrollment()">
                <div class="mb-3">
                  <label class="form-label">Select Student</label>

                  <select
                    class="form-select"
                    name="studentId"
                    [(ngModel)]="studentId">
                    <option [ngValue]="0">Choose a student</option>

                    @for (s of allStudents; track s.id) {
                      <option [ngValue]="s.id">
                        {{ s.firstName }} {{ s.lastName }} ({{ s.email }})
                      </option>
                    }
                  </select>
                </div>

                <label class="form-label">Select Courses</label>

                @for (c of allCourses; track c.id) {
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [id]="'c' + c.id"
                      [checked]="selectedCourseIds.includes(c.id!)"
                      (change)="toggleCourse(c.id!, $any($event.target).checked)">

                    <label class="form-check-label" [for]="'c' + c.id">
                      {{ c.courseName }} — {{ c.fee | currency:'INR' }}
                    </label>
                  </div>
                }

                <button class="btn btn-primary mt-3" [disabled]="busy">
                  Enroll Student
                </button>
              </form>
            </div>
          </div>
        }

        @case ('enrollments') {
          <div class="bg-primary text-white rounded-3 p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2>Students Enrolled in Courses</h2>
              <p class="mb-0">Track enrollment coverage, fees, and details.</p>
            </div>

            <a routerLink="/enrollments/new" class="btn btn-light text-primary">
              Enroll Student
            </a>
          </div>

          <div class="card">
            <div class="card-header">Enrolled Students</div>

            <div class="card-body table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Courses Count</th>
                    <th>Total Fee</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  @for (e of enrollmentPage?.content || []; track e.studentId) {
                    <tr>
                      <td>{{ e.studentId }}</td>
                      <td>{{ e.studentName }}</td>
                      <td>{{ e.email }}</td>
                      <td>{{ e.courseCount }}</td>
                      <td>{{ e.totalFee | currency:'INR' }}</td>
                      <td>
                        <a
                          [routerLink]="['/enrollments', e.studentId]"
                          class="btn btn-sm btn-info text-white">
                          View
                        </a>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6">No enrollments found.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        @case ('enrollmentDetails') {
          <div class="bg-primary text-white rounded-3 p-4 mb-4 d-flex justify-content-between">
            <div>
              <h2>Enrollment Details</h2>
              <p>Overview of courses, fees, and student information.</p>
            </div>

            <a routerLink="/enrollments" class="btn btn-light text-primary">
              Back
            </a>
          </div>

          @if (enrollment) {
            <div class="row g-4">

              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header">Student Information</div>

                  <div class="card-body">
                    <p><b>Name:</b> {{ enrollment.studentName }}</p>
                    <p><b>Email:</b> {{ enrollment.email }}</p>
                    <p><b>Total Courses:</b> {{ enrollment.courseCount }}</p>
                    <p><b>Total Fee:</b> {{ enrollment.totalFee | currency:'INR' }}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header">Enrolled Courses</div>

                  <div class="card-body table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Description</th>
                          <th>Fee</th>
                        </tr>
                      </thead>

                      <tbody>
                        @for (c of enrollment.courseList || []; track c.id) {
                          <tr>
                            <td>{{ c.courseName }}</td>
                            <td>{{ c.description }}</td>
                            <td>{{ c.fee | currency:'INR' }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          }
        }

        @case ('notFound') {
          <div class="text-center py-5">
            <h1 class="display-1 text-danger">404</h1>
            <h2>Page Not Found</h2>
            <p class="text-muted">The page you requested could not be found.</p>
            <a routerLink="/dashboard" class="btn btn-primary">Back to Home</a>
          </div>
        }

        @case ('serverError') {
          <div class="text-center py-5">
            <h1 class="display-1 text-danger">500</h1>
            <h2>Internal Server Error</h2>
            <p class="text-muted">Something went wrong. Please try again later.</p>
            <a routerLink="/dashboard" class="btn btn-primary">Back to Home</a>
          </div>
        }

      }

      @if (error && page !== 'dashboard') {
        <div class="alert alert-danger mt-3">{{ error }}</div>
      }

    </div>
  `
})
export class WorkspacePageComponent implements OnInit {

  @Input({ required: true }) page = '';

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  error = '';
  busy = false;
  currentPage = 0;

  stats: any = null;
  recent: any[] = [];

  studentsPage?: ApiPage<Student>;
  coursesPage?: ApiPage<Course>;
  enrollmentPage?: ApiPage<EnrollmentSummary>;

  student?: Student;
  course?: Course;
  enrollment?: EnrollmentSummary;

  allStudents: Student[] = [];
  allCourses: Course[] = [];

  studentId = 0;
  selectedCourseIds: number[] = [];

  isEdit = false;

  studentForm: Student = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  };

  courseForm: Course = {
    courseName: '',
    courseCode: '',
    duration: '',
    fee: 0,
    description: '',
    active: true
  };

  ngOnInit() {

    const id = Number(
      this.route.snapshot.paramMap.get('id') ||
      this.route.snapshot.paramMap.get('studentId') ||
      0
    );

    this.isEdit =
      this.page === 'studentFormEdit' ||
      this.page === 'courseFormEdit';

    if (this.page === 'studentFormEdit') {
      this.page = 'studentForm';
    }

    if (this.page === 'courseFormEdit') {
      this.page = 'courseForm';
    }

    switch (this.page) {

      case 'dashboard':
        this.api.dashboard().subscribe({
          next: r => {
            this.stats = r.stats;
            this.recent = r.recentEnrollments || [];
          },
          error: e => this.fail(e)
        });
        break;

      case 'students':
        this.loadStudents(0);
        break;

      case 'studentForm':
        if (this.isEdit) {
          this.api.student(id).subscribe({
            next: s => this.studentForm = s,
            error: e => this.fail(e)
          });
        }
        break;

      case 'studentView':
        this.api.student(id).subscribe({
          next: s => this.student = s,
          error: e => this.fail(e)
        });
        break;

      case 'courses':
        this.loadCourses(0);
        break;

      case 'courseForm':
        if (this.isEdit) {
          this.api.course(id).subscribe({
            next: c => this.courseForm = c,
            error: e => this.fail(e)
          });
        }
        break;

      case 'courseView':
        this.api.course(id).subscribe({
          next: c => this.course = c,
          error: e => this.fail(e)
        });
        break;

      case 'enroll':
        this.api.enrollmentOptions().subscribe({
          next: r => {
            this.allStudents = r.students;
            this.allCourses = r.courses;
          },
          error: e => this.fail(e)
        });
        break;

      case 'enrollments':
        this.api.enrollments().subscribe({
          next: r => this.enrollmentPage = r,
          error: e => this.fail(e)
        });
        break;

      case 'enrollmentDetails':
        this.api.enrollment(id).subscribe({
          next: r => this.enrollment = r,
          error: e => this.fail(e)
        });
        break;
    }
  }

  fail(e: any) {
    this.error = e.error?.message || 'The request could not be completed.';
  }

  loadStudents(p: number) {
    if (p < 0) return;

    this.api.students(p).subscribe({
      next: r => {
        this.studentsPage = r;
        this.currentPage = p;
      },
      error: e => this.fail(e)
    });
  }

  loadCourses(p: number) {
    if (p < 0) return;

    this.api.courses(p).subscribe({
      next: r => {
        this.coursesPage = r;
        this.currentPage = p;
      },
      error: e => this.fail(e)
    });
  }

  saveStudent() {
    this.busy = true;

    const id = Number(this.route.snapshot.paramMap.get('id') || 0);

    const req = this.isEdit
      ? this.api.updateStudent(id, this.studentForm)
      : this.api.createStudent(this.studentForm);

    req.subscribe({
      next: () => this.router.navigate(['/students']),
      error: e => {
        this.fail(e);
        this.busy = false;
      }
    });
  }

  saveCourse() {
    this.busy = true;

    const id = Number(this.route.snapshot.paramMap.get('id') || 0);

    const req = this.isEdit
      ? this.api.updateCourse(id, this.courseForm)
      : this.api.createCourse(this.courseForm);

    req.subscribe({
      next: () => this.router.navigate(['/courses']),
      error: e => {
        this.fail(e);
        this.busy = false;
      }
    });
  }

  toggleCourse(id: number, checked: boolean) {
    this.selectedCourseIds = checked
      ? [...this.selectedCourseIds, id]
      : this.selectedCourseIds.filter(x => x !== id);
  }

  submitEnrollment() {

    if (!this.studentId || !this.selectedCourseIds.length) {
      this.error = 'Select a student and at least one course.';
      return;
    }

    this.busy = true;

    this.api.enroll(this.studentId, this.selectedCourseIds).subscribe({
      next: () => this.router.navigate(['/enrollments']),
      error: e => {
        this.fail(e);
        this.busy = false;
      }
    });
  }
}
