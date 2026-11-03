import {Routes} from '@angular/router';import {authGuard} from './core/auth.guard';import {AdminLayoutComponent} from './layout/admin-layout.component';import {LoginComponent} from './pages/login.component';
import {DashboardComponent} from './pages/dashboard.component';
import {StudentsComponent} from './pages/students.component';
import {AddStudentComponent} from './pages/add-student.component';
import {EditStudentComponent} from './pages/edit-student.component';
import {ViewStudentComponent} from './pages/view-student.component';
import {CoursesComponent} from './pages/courses.component';
import {AddCourseComponent} from './pages/add-course.component';
import {EditCourseComponent} from './pages/edit-course.component';
import {ViewCourseComponent} from './pages/view-course.component';
import {EnrollCourseComponent} from './pages/enroll-course.component';
import {EnrolledStudentsComponent} from './pages/enrolled-students.component';
import {EnrollmentDetailsComponent} from './pages/enrollment-details.component';
import {NotFoundComponent} from './pages/404.component';
import {ServerErrorComponent} from './pages/500.component';
export const routes:Routes=[{path:'login',component:LoginComponent},{path:'',component:AdminLayoutComponent,canActivate:[authGuard],children:[
{path:'',pathMatch:'full',redirectTo:'dashboard'},{path:'dashboard',component:DashboardComponent},{path:'students',component:StudentsComponent},{path:'students/new',component:AddStudentComponent},{path:'students/:id/edit',component:EditStudentComponent},{path:'students/:id',component:ViewStudentComponent},{path:'courses',component:CoursesComponent},{path:'courses/new',component:AddCourseComponent},{path:'courses/:id/edit',component:EditCourseComponent},{path:'courses/:id',component:ViewCourseComponent},{path:'enrollments/new',component:EnrollCourseComponent},{path:'enrollments',component:EnrolledStudentsComponent},{path:'enrollments/:studentId',component:EnrollmentDetailsComponent},{path:'404',component:NotFoundComponent},{path:'500',component:ServerErrorComponent}]},{path:'**',redirectTo:'404'}];
