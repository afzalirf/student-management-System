import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-add-student',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="studentForm"></app-workspace-page>`})
export class AddStudentComponent{}
