import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-enrolled-students',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="enrollments"></app-workspace-page>`})
export class EnrolledStudentsComponent{}
