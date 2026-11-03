import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-students',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="students"></app-workspace-page>`})
export class StudentsComponent{}
