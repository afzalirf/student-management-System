import {Injectable,inject} from '@angular/core';import {HttpClient,HttpParams} from '@angular/common/http';import {Observable} from 'rxjs';
export interface ApiPage<T>{content:T[];totalPages:number;totalElements:number;number:number;size:number;}
export interface Student{id?:number;firstName:string;lastName:string;email:string;phoneNumber?:string;address?:string;active?:boolean;}
export interface Course{id?:number;courseName:string;courseCode:string;duration:string;fee:number;description?:string;active?:boolean;}
export interface EnrollmentSummary{studentId:number;studentName:string;email:string;courseCount:number;totalFee:number;courseList?:Course[];}
@Injectable({providedIn:'root'}) export class ApiService{
 private http=inject(HttpClient);private opts={withCredentials:true};
 login(username:string,password:string):Observable<any>{return this.http.post('/api/auth/login',{username,password},this.opts)}
 me():Observable<any>{return this.http.get('/api/auth/me',this.opts)} logout():Observable<any>{return this.http.post('/api/auth/logout',{},this.opts)}
 dashboard():Observable<any>{return this.http.get('/api/dashboard',this.opts)}
 students(page=0):Observable<ApiPage<Student>>{return this.http.get<ApiPage<Student>>('/api/students',{...this.opts,params:new HttpParams().set('page',page).set('size',10)})}
 student(id:number):Observable<Student>{return this.http.get<Student>(`/api/students/${id}`,this.opts)} createStudent(x:Student):Observable<Student>{return this.http.post<Student>('/api/students',x,this.opts)} updateStudent(id:number,x:Student):Observable<Student>{return this.http.put<Student>(`/api/students/${id}`,x,this.opts)}
 courses(page=0):Observable<ApiPage<Course>>{return this.http.get<ApiPage<Course>>('/api/courses',{...this.opts,params:new HttpParams().set('page',page).set('size',10)})}
 course(id:number):Observable<Course>{return this.http.get<Course>(`/api/courses/${id}`,this.opts)} createCourse(x:Course):Observable<Course>{return this.http.post<Course>('/api/courses',x,this.opts)} updateCourse(id:number,x:Course):Observable<Course>{return this.http.put<Course>(`/api/courses/${id}`,x,this.opts)}
 enrollmentOptions():Observable<{students:Student[];courses:Course[]}>{return this.http.get<{students:Student[];courses:Course[]}>('/api/enrollments/options',this.opts)} enroll(studentId:number,courseIds:number[]):Observable<any>{return this.http.post('/api/enrollments',{studentId,courseIds},this.opts)}
 enrollments(page=0):Observable<ApiPage<EnrollmentSummary>>{return this.http.get<ApiPage<EnrollmentSummary>>('/api/enrollments',{...this.opts,params:new HttpParams().set('page',page).set('size',10)})} enrollment(id:number):Observable<EnrollmentSummary>{return this.http.get<EnrollmentSummary>(`/api/enrollments/${id}`,this.opts)}
}
